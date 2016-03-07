import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';
import {deck, splitDeck} from '../src/deck';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('starts new game', () => {
    const action = {type: 'NEW'};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({deck:deck}));
  });

  it('adds players', () => {
    const initialState = Map({
      deck: deck
    });
    const action = {type: 'ADD_PLAYERS', players: ['Kanye', 'Fabolous']};
    const nextState = reducer(initialState, action);
    expect(nextState.get('playerDecks')).to.be.ok;
  });

  it('adds decks to players', () => {
    const initialState = Map({
      deck: deck
    });
    const action = {type: 'ADD_PLAYERS', players: ['Kanye', 'Fabolous']};
    const nextState = reducer(initialState, action);
    expect(List.isList(nextState.getIn(['playerDecks', 'Kanye']))).to.be.true;
    expect(List.isList(nextState.getIn(['playerDecks', 'Fabolous']))).to.be.true;
  });

  it('adds decks to players of size 26', () => {
    const initialState = Map({
      deck: deck
    });
    const action = {type: 'ADD_PLAYERS', players: ['Kanye', 'Fabolous']};
    const nextState = reducer(initialState, action);
    expect(
      nextState.getIn(['playerDecks', 'Kanye']).size
    ).to.equal(deck.size/2);
    expect(
      nextState.getIn(['playerDecks', 'Fabolous']).size
    ).to.equal(deck.size/2);
  });

  describe('drawing', () => {
    let decks;
    beforeEach(() => {
      decks = splitDeck(deck);
    });

    it('draws first card for first player', () => {
      const player = 'Kanye';
      const initialState = Map({
        playerDecks: Map({
          [player]: decks.first(),
          Fabolous: decks.last()
        })
      });
      const action = {type: 'DRAW', drawer: player};
      const nextState = reducer(initialState, action);

      expect(nextState.getIn(['match', player])).to.be.ok;
      expect(deck).to.include(nextState.getIn(['match', player]));
    });

    it('draws first card for second player', () => {
      const player = 'Fabolous';
      const initialState = Map({
        playerDecks: Map({
          Kanye: decks.first(),
          [player]: decks.last()
        })
      });
      const action = {type: 'DRAW', drawer: player};
      const nextState = reducer(initialState, action);

      expect(nextState.getIn(['match', player])).to.be.ok;
      expect(deck).to.include(nextState.getIn(['match', player]));
    });

    it('allows both players to draw', () => {
      const initialState = Map({
        playerDecks: Map({
          Kanye: decks.first(),
          Fabolous: decks.last()
        })
      });
      let action = {type: 'DRAW', drawer: 'Kanye'};
      let nextState = reducer(initialState, action);
      expect(nextState.getIn(['match', 'Kanye'])).to.be.ok;
      expect(nextState.getIn(['match', 'Fabolous'])).not.to.be.ok;

      action.drawer = 'Fabolous';
      nextState = reducer(nextState, action);
      expect(nextState.getIn(['match', 'Kanye'])).to.be.ok;
      expect(nextState.getIn(['match', 'Fabolous'])).to.be.ok;
    });

    it('reduces player\'s deck count for first player', () => {
      const player = 'Kanye';
      const initialState = Map({
        playerDecks: Map({
          [player]: decks.first(),
          Fabolous: decks.last()
        })
      });
      const action = {type: 'DRAW', drawer: player};
      const nextState = reducer(initialState, action);

      expect(nextState.getIn(['playerDecks', player]).size).to.equal(
        (deck.size/2)-1
      );
    });

    it('reduces player\'s deck count for second player', () => {
      const player = 'Fabolous';
      const initialState = Map({
        playerDecks: Map({
          Kanye: decks.first(),
          [player]: decks.last()
        })
      });
      const action = {type: 'DRAW', drawer: player};
      const nextState = reducer(initialState, action);

      expect(nextState.getIn(['playerDecks', player]).size).to.equal(
        (deck.size/2)-1
      );
    });

    it('won\'t let player draw twice', () => {
      const player = 'Kanye';
      const initialState = Map({
        playerDecks: Map({
          [player]: decks.first(),
          Fabolous: decks.last()
        })
      });
      const action = {type: 'DRAW', drawer: player};

      let nextState = reducer(initialState, action);
      nextState = reducer(nextState, action);

      const match = nextState.get('match').toJS()
      expect(match).to.include.keys('Kanye');
      expect(match).not.to.include.keys('Fabolous');
    });

    it('will draw into new match if draw has already taken place', () => {
      let initialState = fromJS({
        drawMatches: [
          {Kanye: '1A', Fabolous: '1S'}
        ],
        hiddenDecks: {
          Kanye: ['2A', '3A', '4A'],
          Fabolous: ['5A', '6A', '7A']
        },
        playerDecks: {
          Kanye: ['1S', '2S'],
          Fabolous: ['1C', '2C']
        }
      });

      const action = {type: 'DRAW', drawer: 'Fabolous'};
      let nextState = reducer(initialState, action);
      expect(nextState.get('match')).to.be.ok;
    });
  });

  describe('compare', () => {
    let decks;
    beforeEach(() => {
      decks = splitDeck(deck);
    });

    it('will find a winner if player 1 wins', () => {
      const initialState = Map({
        match: Map({
          Kanye: '1H',
          Fabolous: '4H'
        }),
        playerDecks: Map({
          Kanye: decks.first(),
          Fabolous: decks.last()
        })
      });
      const action = {type: 'COMPARE'};
      let nextState = reducer(initialState, action);

      expect(nextState.get('winner')).to.equal('Kanye');
    });

    it('will find a winner if player 2 wins', () => {
      const initialState = Map({
        match: Map({
          Kanye: '2H',
          Fabolous: '4H'
        }),
        playerDecks: Map({
          Kanye: decks.first(),
          Fabolous: decks.last()
        })
      });
      const action = {type: 'COMPARE'};
      let nextState = reducer(initialState, action);

      expect(nextState.get('winner')).to.equal('Fabolous');
    });

    describe('ties', () => {
      it('will find a winner in single tied state', () => {
        let initialState = fromJS({
          match: {
            Kanye: '1S',
            Fabolous: '2C'
          },
          drawMatches: [
            {Kanye: '1A', Fabolous: '1S'}
          ],
          hiddenDecks: {
            Kanye: ['2A', '3A', '4A'],
            Fabolous: ['5A', '6A', '7A']
          },
          playerDecks: {
            Kanye: ['2S'],
            Fabolous: ['1C']
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(nextState.get('winner')).to.be.ok;
      });

      it('will add a new draw match for second tie' , () => {
        const players = ['Kanye', 'Fabolous'];
        let initialState = fromJS({
          match: {
            [players[0]]: '2S',
            [players[1]]: '2C'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1S'}
          ],
          hiddenDecks: {
            [players[0]]: ['2A', '3A', '4A'],
            [players[1]]: ['5A', '6A', '7A']
          },
          playerDecks: {
            [players[0]]: decks.first(),
            [players[1]]: decks.last()
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(nextState.get('drawMatches').size).to.equal(2);
      });

      it('will add a new draw match for second tie and so on... ', () => {
        const players = ['Kanye', 'Fabolous'];
        let initialState = fromJS({
          match: {
            [players[0]]: '2S',
            [players[1]]: '2C'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1S'},
            {[players[0]]: '1A', [players[1]]: '1S'}
          ],
          hiddenDecks: {
            [players[0]]: ['2A', '3A', '4A'],
            [players[1]]: ['5A', '6A', '7A']
          },
          playerDecks: {
            [players[0]]: decks.first(),
            [players[1]]: decks.last()
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(nextState.get('drawMatches').size).to.equal(3);
      });

      it('will add more cards to hidden decks', () => {
        const players = ['Kanye', 'Fabolous'];
        let initialState = fromJS({
          match: {
            [players[0]]: '2S',
            [players[1]]: '2C'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1S'}
          ],
          hiddenDecks: {
            [players[0]]: ['2A', '3A', '4A'],
            [players[1]]: ['5A', '6A', '7A']
          },
          playerDecks: {
            [players[0]]: decks.first(),
            [players[1]]: decks.last()
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(
          nextState
            .getIn(['hiddenDecks', players[0]])
            .size
        ).to.equal(
          initialState
            .getIn(['hiddenDecks', players[0]])
            .size 
            + 3
        );
      });

      it('will add more cards to hidden decks and so on', () => {
        const players = ['Kanye', 'Fabolous'];
        let initialState = fromJS({
          match: {
            [players[0]]: '2S',
            [players[1]]: '2C'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1S'}
          ],
          hiddenDecks: {
            [players[0]]: ['2A', '3A', '4A', '1S', '2S', '3S'],
            [players[1]]: ['5A', '6A', '7A', '1S', '2S', '3S']
          },
          playerDecks: {
            [players[0]]: decks.first(),
            [players[1]]: decks.last()
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(
          nextState
            .getIn(['hiddenDecks', players[0]])
            .size
        ).to.equal(
          initialState
            .getIn(['hiddenDecks', players[0]])
            .size 
            + 3
        );
      });

      it('will add more cards to hidden decks if already tied', () => {
        const players = ['Kanye', 'Fabolous'];
        let initialState = fromJS({
          match: {
            [players[0]]: '2S',
            [players[1]]: '2C'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1S'}
          ],
          hiddenDecks: {
            [players[0]]: ['2A', '3A', '4A'],
            [players[1]]: ['5A', '6A', '7A']
          },
          playerDecks: {
            [players[0]]: decks.first(),
            [players[1]]: decks.last()
          }
        });

        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);
        expect(
          nextState
            .getIn(['hiddenDecks', players[0]])
            .size
        ).to.equal(
          initialState
            .getIn(['hiddenDecks', players[0]])
            .size 
            + 3
        );
      });

      it('will add the draw matches array if it\s a tie', () => {
        const initialState = Map({
          match: Map({
            Kanye: '4H',
            Fabolous: '4H'
          }),
          playerDecks: Map({
            Kanye: decks.first(),
            Fabolous: decks.last()
          })
        });
        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);

        expect(nextState.get('drawMatches')).to.be.ok;
        expect(nextState.get('drawMatches').first()).to.equal(fromJS(
          initialState.get('match')
        ));
      });

      it('create hidden decks for each player', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = Map({
          match: Map({
            [players[0]]: '4H',
            [players[1]]: '4H'
          }),
          playerDecks: Map({
            Kanye: decks.first(),
            Fabolous: decks.last()
          })
        });
        const action = {type: 'COMPARE'};
        let nextState = reducer(initialState, action);

        expect(nextState.get('hiddenDecks')).to.be.ok;
        expect(nextState.getIn(['hiddenDecks', players[0]]))
          .to.be.ok;
      });

      it('will add 3 cards to hidden decks from player decks', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = Map({
          match: Map({
            [players[0]]: '4H',
            [players[1]]: '4H'
          }),
          playerDecks: Map({
            Kanye: decks.first(),
            Fabolous: decks.last()
          })
        });
        const action = {type: 'COMPARE'};
        const nextState = reducer(initialState, action);

        expect(nextState.get('hiddenDecks')).to.be.ok;
        expect(nextState.getIn(['hiddenDecks', players[0]]).size)
          .to.equal(3);
        expect(nextState.getIn(['playerDecks', players[0]]).size)
          .to.equal(decks.first().size - 3);
      });

      it('will add 3 cards to hidden decks from player decks', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = Map({
          match: Map({
            [players[0]]: '4H',
            [players[1]]: '4H'
          }),
          playerDecks: Map({
            Kanye: decks.first(),
            Fabolous: decks.last()
          })
        });
        const action = {type: 'COMPARE'};
        const nextState = reducer(initialState, action);

        expect(nextState.get('hiddenDecks')).to.be.ok;
        expect(nextState.getIn(['hiddenDecks', players[0]]).size)
          .to.equal(3);
        expect(nextState.getIn(['playerDecks', players[0]]).size)
          .to.equal(decks.first().size - 3);
      });

      it('will put last card into match if only one in hand', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = fromJS({
          match: {
            [players[0]]: '3C',
            [players[1]]: '3H'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1A'}
          ],
          hiddenDecks: {
            [players[0]]: ['4H', '2D', '1S'],
            [players[1]]: ['7H', '9D', '11C']
          },
          playerDecks: {
            [players[0]]: ['1C'],
            [players[1]]: ['1H', '2H', '3H', '4H']
          }
        });

        const action = {type: 'COMPARE'};
        const nextState = reducer(initialState, action);
        expect(nextState.getIn(['match', players[0]])).to.equal('1C');
        expect(nextState.getIn(['match', players[1]])).not.to.be.ok;
      });

      it('will put player 2\'s cards into into the hidden decks', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = fromJS({
          match: {
            [players[0]]: '3C',
            [players[1]]: '3H'
          },
          drawMatches: [
            {[players[0]]: '1A', [players[1]]: '1A'}
          ],
          hiddenDecks: {
            [players[0]]: ['4H', '2D', '1S'],
            [players[1]]: ['7H', '9D', '11C']
          },
          playerDecks: {
            [players[0]]: ['1C'],
            [players[1]]: ['1H', '2H', '3H', '4H']
          }
        });

        const action = {type: 'COMPARE'};
        const nextState = reducer(initialState, action);
        expect(
          nextState
            .getIn(['playerDecks', players[1]])
            .size
        ).to.equal(1);
        expect(
          nextState
            .getIn(['hiddenDecks', players[1]])
            .size
        ).to.equal(6);
      });

      it('will put last card into match if multiple in hand', () => {
        const players = ['Kanye', 'Fabolous'];
        const initialState = Map({
          match: Map({
            [players[0]]: '3C',
            [players[1]]: '3H'
          }),
          drawMatches: List([
            Map({[players[0]]: '1A', [players[1]]: '1A'})
          ]),
          hiddenDecks: Map({
            [players[0]]: List(['4H', '2D', '1S']),
            [players[1]]: List(['7H', '9D', '11C'])
          }),
          playerDecks: Map({
            [players[0]]: List(['1C', '3D']),
            [players[1]]: List(['1H', '2H', '3H', '4H'])
          })
        });

        const action = {type: 'COMPARE'};
        const nextState = reducer(initialState, action);
        expect(nextState.getIn(['match', players[0]])).to.equal('3D');
        expect(
          nextState
            .getIn(['hiddenDecks', players[0]])
            .size
        ).to.equal(4);
        expect(nextState.getIn(['match', players[1]])).not.to.be.ok;
      });

    });
  });

  describe('resolve', () => {
    it('divies out cards to the player who won!', () => {
      const players = ['Kanye', 'Fabolous'];
      const initialState = fromJS({
        winner: players[1],
        match: {
          [players[0]]: '2C',
          [players[1]]: '3H'
        },
        drawMatches: [
          {[players[0]]: '1A', [players[1]]: '1A'}
        ],
        hiddenDecks: {
          [players[0]]: ['4H', '2D', '1S'],
          [players[1]]: ['7H', '9D', '11C']
        },
        playerDecks: {
          [players[0]]: ['1C'],
          [players[1]]: ['1H', '2H', '3H', '4H']
        }
      });

      const action = {type: 'RESOLVE'};
      const nextState = reducer(initialState, action);
      expect(nextState.get('winner')).not.to.be.ok;
      expect(nextState.get('match')).not.to.be.ok;
      expect(nextState.get('drawMatches')).not.to.be.ok;
      expect(nextState.get('hiddenDecks')).not.to.be.ok;
      expect(nextState.get('playerDecks')).to.be.ok;
      expect(nextState.getIn(['playerDecks', players[1]]).size)
        .to.equal(14);
    });

    it('divies out cards to the player who won!', () => {
      const players = ['Kanye', 'Fabolous'];
      const initialState = fromJS({
        winner: players[1],
        match: {
          [players[0]]: '2C',
          [players[1]]: '3H'
        },
        drawMatches: [
          {[players[0]]: '1A', [players[1]]: '1A'},
          {[players[0]]: '3A', [players[1]]: '2A'}
        ],
        hiddenDecks: {
          [players[0]]: ['4H', '2D', '1S'],
          [players[1]]: ['7H', '9D', '11C']
        },
        playerDecks: {
          [players[0]]: ['1C'],
          [players[1]]: ['1H', '2H', '3H', '4H']
        }
      });

      const action = {type: 'RESOLVE'};
      const nextState = reducer(initialState, action);
      expect(nextState.get('winner')).not.to.be.ok;
      expect(nextState.get('match')).not.to.be.ok;
      expect(nextState.get('drawMatches')).not.to.be.ok;
      expect(nextState.get('hiddenDecks')).not.to.be.ok;
      expect(nextState.get('playerDecks')).to.be.ok;
      expect(nextState.getIn(['playerDecks', players[1]]).size)
        .to.equal(16);
    });

    it('divies out cards to the player who won!', () => {
      const players = ['Kanye', 'Fabolous'];
      const initialState = fromJS({
        winner: players[1],
        match: {
          [players[0]]: '2C',
          [players[1]]: '3H'
        },
        playerDecks: {
          [players[0]]: ['1C'],
          [players[1]]: ['1H', '2H', '3H', '4H']
        }
      });

      const action = {type: 'RESOLVE'};
      const nextState = reducer(initialState, action);
      expect(nextState.get('winner')).not.to.be.ok;
      expect(nextState.get('match')).not.to.be.ok;
      expect(nextState.get('drawMatches')).not.to.be.ok;
      expect(nextState.get('hiddenDecks')).not.to.be.ok;
      expect(nextState.get('playerDecks')).to.be.ok;
      expect(nextState.getIn(['playerDecks', players[1]]).size)
        .to.equal(6);
      expect(nextState.getIn(['playerDecks', players[0]]).size)
        .to.equal(1);
    });

    it('crowns a victor if there is one', () => {
      const players = ['Kanye', 'Fabolous'];
      const initialState = fromJS({
        winner: players[1],
        match: {
          [players[0]]: '2C',
          [players[1]]: '3H'
        },
        playerDecks: {
          [players[0]]: [],
          [players[1]]: ['1H', '2H', '3H', '4H']
        }
      });

      const action = {type: 'RESOLVE'};
      const nextState = reducer(initialState, action);
      expect(nextState.get('winner')).not.to.be.ok;
      expect(nextState.get('match')).not.to.be.ok;
      expect(nextState.get('drawMatches')).not.to.be.ok;
      expect(nextState.get('hiddenDecks')).not.to.be.ok;
      expect(nextState.get('playerDecks')).not.to.be.ok;
      expect(nextState.get('victor')).to.be.ok;
      expect(nextState.get('victor')).to.equal(players[1]);
    });
  });

});
