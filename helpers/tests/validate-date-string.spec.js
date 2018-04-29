const { expect } = require('chai');
const { isUnix, isNatural } = require('../validate-date-string');

describe('isUnix()', () => {
  it('returns true if the dateStr is a positive number', () => {
    expect(isUnix('100000')).to.equal(true);
  });

  it('returns true if the dateStr is a negative number', () => {
    expect(isUnix('-50000')).to.equal(true);
  });

  it('returns true if the dateStr is a number with leading 0s', () => {
    expect(isUnix('00005')).to.equal(true);
  });
});

describe('isNatural()', () => {
  describe('it returning an object', () => {
    it('works with `mm-dd-yyyy`', () => {
      expect(isNatural('12-04-1988')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
    it('works with `mm/dd/yyyy`', () => {
      expect(isNatural('12/04/1988')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
    it('works with `MM dd, yyyy`', () => {
      expect(isNatural('December 4, 1988')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
    it('works with yyyy-MM-dd', () => {
      expect(isNatural('1988-Dec-04')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
    it('works with yyyy/mm/dd', () => {
      expect(isNatural('1988/12/04')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
    it('works with yyyy MM dd', () => {
      expect(isNatural('1988 December 4')).to.deep.equal({
        month: 'December',
        day: 4,
        year: '1988',
      });
    });
  });

  it('returns null for an invalid date format', () => {
    expect(isNatural('Lan 35, 1888')).to.equal(null);
  })
});
