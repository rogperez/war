import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import {expect} from 'chai';

import { War } from '../../src/components/War';
import NewGameForm from '../../src/components/NewGameForm';
import Hand from '../../src/components/Hand';

describe('war', () => {
  it('should render form for an empty game', () => {
    const component = renderIntoDocument(<War />);
    const newGameComponent = scryRenderedComponentsWithType(component, NewGameForm);

    expect(newGameComponent.length).to.equal(1);
  });

  it('should render a hand if players are in props', () => {
    const playerDecks = new Map({ Kanye: [], Fabolous: [] });
    const component = renderIntoDocument(<War playerDecks={playerDecks} />);
    const hands = scryRenderedComponentsWithType(component, Hand);

    expect(hands.length).to.equal(Object.keys(playerDecks.toJS()).length);
  });

  describe('#getPlayerState', () => {
    it('returns the player deck for the specific player', () => {
      const kanyesDeck = ['1S'];
      const faboloussDeck = ['2C'];
      const playerDecks = new Map({ Kanye: kanyesDeck, Fabolous: faboloussDeck});
      const component = renderIntoDocument(<War playerDecks={playerDecks} />);

      expect(component.getPlayerState('Kanye').deck).to.equal(kanyesDeck);
      expect(component.getPlayerState('Fabolous').deck).to.equal(faboloussDeck);
    });

    it('returns the match card for a specific player', () => {
      const playerDecks = new Map({ Kanye: [], Fabolous: [] });

      const kanyesMatchCard = '12D';
      const faboloussMatchCard = '1C';
      const match = new Map({ Kanye: kanyesMatchCard, Fabolous: faboloussMatchCard });

      const component = renderIntoDocument(
        <War playerDecks={playerDecks} match={match} />
      );

      expect(component.getPlayerState('Kanye').playCard).to.equal(kanyesMatchCard);
      expect(component.getPlayerState('Fabolous').playCard).to.equal(faboloussMatchCard);
    });

    it('returns the hidden deck for a specific player', () => {
      const playerDecks = new Map({ Kanye: [], Fabolous: [] });

      const kanyesHiddenDeck = ['12D', '11C', '1C'];
      const faboloussHiddenDeck = ['12D', '11C', '1C'];
      const hiddenDecks = new Map({ Kanye: kanyesHiddenDeck, Fabolous: faboloussHiddenDeck });

      const component = renderIntoDocument(
        <War playerDecks={playerDecks} hiddenDecks={hiddenDecks} />
      );

      expect(component.getPlayerState('Kanye').hiddenDeck).to.equal(kanyesHiddenDeck);
      expect(component.getPlayerState('Fabolous').hiddenDeck).to.equal(faboloussHiddenDeck);
    });
  });
});

