const { expect } = require('chai');
const jsonifyDateString = require('../jsonify-date-string');

describe('jsonifyDateString()', () => {
  it('should return the valid JSON object when given a unix value (number)', () => {
    expect(jsonifyDateString('597196800')).to.deep.equal(
      {
        natural: "December 4, 1988",
        unix: "597196800"
      }
    );
  });

  it('should return the valid JSON object when given a validly formatted date', () => {
    expect(jsonifyDateString('12-04-1988')).to.deep.equal(
      {
        natural: "December 4, 1988",
        unix: "597196800"
      }
    );
  });

  it('should return the invalid JSON object when given no valid parameter', () => {
    expect(jsonifyDateString('hello')).to.deep.equal(
      {
        natural: null, 
        unix:null
      }
    );
  });
});
