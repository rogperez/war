import {expect} from 'chai';
import {List} from 'immutable';
import {
  deck,
  getRandomInt,
  getRandomCard,
  splitDeck
} from '../src/deck';

describe('deck', () => {

  describe('split', () => {

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

    it('should return non mutated deck', () => {
      let randomCard = getRandomCard(deck);
      expect(deck.size).to.equal(52);
    });
    
    it('return false for an empty deck', () => {
      const emptyDeck = List([]);
      const card = getRandomCard(emptyDeck);
      expect(card).not.to.be.ok;
    });

  });

});
