import {expect} from 'chai';
import {List} from 'immutable';

describe('deck', () => {

  describe('split', () => {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomCard(deck) {
      return deck.get(getRandomInt(0, deck.size));
    }

    function splitDeck(deck) {
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

    let deck;
    beforeEach(() => {
      deck = List(require('../cards.json'));
    });

    it('should split the deck into 2', () => {
      let decks = splitDeck(deck);
      expect(decks.size).to.equal(2);
    });

    it('should split the deck into 2 equal halves', () => {
      let decks = splitDeck(deck);
      expect(decks.get(0).size).to.equal(deck.size/2);
    });

    it('should return a random card', () => {
      let randomCard = getRandomCard(deck);
      expect(deck).to.include(randomCard);
    });

    it('should return not mutate deck', () => {
      let randomCard = getRandomCard(deck);
      expect(deck.size).to.equal(52);
    });

  });

});
