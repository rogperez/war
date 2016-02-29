import {splitDeck, getRandomCard} from './deck';
import {Map, List, fromJS} from 'immutable';
import {compare} from './war';
import {INITIAL_STATE} from './core';

function splitDeckForPlayers(state, players) {
  const decks = splitDeck(state.get('deck'));
  const playerDecks = {
    [players[0]]: decks.first(),
    [players[1]]: decks.last()
  };

  return Map({
    playerDecks: fromJS(playerDecks)
  });
}

function draw(state, drawer) {
  const playerDeck = state.getIn(['playerDecks', drawer]);

  const card = playerDeck.first();
  if (!card) {
    return state
      .setIn(['playerDecks', drawer], reducedDeck);
  }

  const reducedDeck = playerDeck.delete(playerDeck.indexOf(card));

  return state
    .setIn(['match', drawer], card)
    .setIn(['playerDecks', drawer], reducedDeck);
}

function drawFirstCard(playerDeck) {
  const card = playerDeck.first();
  if (card) {
    playerDeck = playerDeck.delete(playerDeck.indexOf(card));
  }
  
  return fromJS({
    deck: playerDeck,
    card: card
  });
}

function fillHiddenDecks(playerDeck) {
  let deckState = false;
  let hiddenDeck = [];

  let i=0;
  for(i; i < 3; i++ ) {
    if (deckState) {
      deckState = drawFirstCard(deckState.get('deck'));   
    } else {
      deckState = drawFirstCard(playerDeck);   
    }

    if(deckState.get('deck').isEmpty()) {
      return fromJS({
        modifiedDeck: List(),
        hiddenDeck: hiddenDeck,
        matchCard: deckState.get('card')
      });
    }
    
    if (deckState.get('card')) {
      hiddenDeck.push(deckState.get('card'));
    }
  }

  return fromJS({
    modifiedDeck: deckState.get('deck'),
    hiddenDeck: hiddenDeck
  });
}

function compareMatch(state) {
  const players = Object.keys(state.get('match').toJS());
  const winner = compare(state.getIn(['match', players[0]]), state.getIn(['match', players[1]])); 

  switch (winner) {
    case 'draw':
      const decks = state.get('playerDecks');
      const player1Decks = fillHiddenDecks(decks.get(players[0]));
      const player2Decks = fillHiddenDecks(decks.get(players[1]));

      // this handles if we're already tied
      let drawMatches = state.get('drawMatches') ?
        state.get('drawMatches').push(state.get('match')) :
        List([state.get('match')]);

      // this handles if player didn't have enough cards
      let matchExists = false;
      let match = {};
      if (player1Decks.get('matchCard') || player2Decks.get('matchCard')) {
        matchExists = true;
        match = {};
        player1Decks.get('matchCard') ? 
          match[players[0]] = player1Decks.get('matchCard') 
          : 
          match[players[1]] = player2Decks.get('matchCard');
      }

      const player1HiddenDeck =
        state.getIn(['hiddenDecks', players[0]]) ? 
          state.getIn(['hiddenDecks', players[0]])
            .concat(player1Decks.get('hiddenDeck'))
        : 
          player1Decks.get('hiddenDeck');

      const player2HiddenDeck =
        state.getIn(['hiddenDecks', players[1]]) ? 
          state.getIn(['hiddenDecks', players[1]])
            .concat(player2Decks.get('hiddenDeck'))
        : 
          player2Decks.get('hiddenDeck');

      let newState = state
        .concat({
          drawMatches: drawMatches,
          hiddenDecks: Map({
            [players[0]]: player1HiddenDeck,
            [players[1]]: player2HiddenDeck
          })
        })
        .merge({playerDecks: Map({
            [players[0]]: player1Decks.get('modifiedDeck'),
            [players[1]]: player2Decks.get('modifiedDeck')
          })
        });

      if (matchExists) {
        newState = newState.set('match', Map(match));
      }

      return newState;
    case state.getIn(['match', players[0]]):
      return state
             .concat({winner: players[0]});
    case state.getIn(['match', players[1]]):
      return state
             .concat({winner: players[1]});
  }
}

function resolve(state) {
  const winner = state.get('winner');
  const players = Object.keys(state.get('match').toJS());
  let winningCards = [];

  const match = state.get('match');
  winningCards.push(match.get(players[0]));
  winningCards.push(match.get(players[1]));

  const drawMatches = state.get('drawMatches');
  if (drawMatches) {
    drawMatches.forEach((drawMatch) => {
      winningCards.push(drawMatch.get(players[0]));
      winningCards.push(drawMatch.get(players[1]));
    });
  }

  const hiddenDecks = state.get('hiddenDecks');
  if (hiddenDecks) {
    winningCards = winningCards.concat(hiddenDecks.get(players[0]).toJS());
    winningCards = winningCards.concat(hiddenDecks.get(players[1]).toJS());
  }

  const winnerDeck = state
                       .getIn(['playerDecks', winner])
                       .concat(List(winningCards));


  const newState = state
    .delete('winner')
    .delete('match')
    .delete('drawMatches')
    .delete('hiddenDecks')
    .setIn(['playerDecks', winner], winnerDeck);

    //if one player is left with 0 cards here is where we crown the victor
    if (state.getIn(['playerDecks', players[0]]).isEmpty()) {
      return Map({victor: players[1]});
    }
    if (state.getIn(['playerDecks', players[1]]).isEmpty()) {
      return Map({victor: players[0]});
    }
  
  return newState;
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_PLAYERS':
    return splitDeckForPlayers(state, action.players);
  case 'DRAW':
    const player = action.drawer;
    if (state.getIn(['match', player])) {
      console.log(`${player} CAN'T DRAW AGAIN!!`);
    }
    return draw(state, player);
  case 'COMPARE':
    return compareMatch(state);
  case 'RESOLVE':
    return resolve(state);
  }
  return state;
}
