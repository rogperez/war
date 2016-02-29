import {List} from 'immutable';

export const deck = List(require('./deck.json'))

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomCard(deck) {
  if(!List.isList(deck)) deck = List(deck);
  if(!deck.size) {
    return false;
  }
  return deck.get(getRandomInt(0, deck.size));
}

export function splitDeck(deck) {
  let deck1 = [];
  let deck2 = [];

  let i = 0;
  const split = (reducedDeck) => {
    let randomCard = getRandomCard(reducedDeck);
    reducedDeck = reducedDeck.delete(reducedDeck.indexOf(randomCard));

    i%2 ? deck1.push(randomCard) : deck2.push(randomCard)

    if(reducedDeck.size === 0) {
      return List.of(
        List(deck1), 
        List(deck2)
      );
    } else {
      i++;
      return split(reducedDeck);
    }
  }

  return split(deck);
}

