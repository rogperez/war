import {expect} from 'chai';
import {compare} from '../src/war';

describe('war', () => {

  describe('compare', () => {

    it('comparisons with Aces', () => {
      expect(compare('1H', '1D')).to.equal('draw');
      expect(compare('1H', '2H')).to.equal('1H');
      expect(compare('1H', '3H')).to.equal('1H');
      expect(compare('1H', '4H')).to.equal('1H');
      expect(compare('1H', '5H')).to.equal('1H');
      expect(compare('1H', '6H')).to.equal('1H');
      expect(compare('1H', '7H')).to.equal('1H');
      expect(compare('1H', '8H')).to.equal('1H');
      expect(compare('1H', '9H')).to.equal('1H');
      expect(compare('1H', '10')).to.equal('1H');
      expect(compare('1H', '11H')).to.equal('1H');
      expect(compare('1H', '12H')).to.equal('1H');
      expect(compare('1H', '13H')).to.equal('1H');
    });

    it('comparisons with all other cards', () => {
      expect(compare('13H', '1D')).to.equal('1D');
      expect(compare('12H', '2D')).to.equal('12H');
      expect(compare('11H', '3D')).to.equal('11H');
      expect(compare('10H', '4D')).to.equal('10H');
      expect(compare('9H', '5D')).to.equal('9H');
      expect(compare('8H', '6D')).to.equal('8H');
      expect(compare('7H', '7D')).to.equal('draw');
      expect(compare('6H', '8D')).to.equal('8D');
      expect(compare('5H', '9D')).to.equal('9D');
      expect(compare('4H', '10D')).to.equal('10D');
      expect(compare('3H', '11D')).to.equal('11D');
      expect(compare('2H', '12D')).to.equal('12D');
      expect(compare('1H', '13D')).to.equal('1H');
    });

  });

});
