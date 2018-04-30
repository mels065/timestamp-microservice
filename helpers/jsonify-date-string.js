const { isUnix, isNatural } = require('./validate-date-string');
const { capitalize } = require('./util');

module.exports = function jsonifyDateString(dateStr) {
  const { MONTHS } = require('./constants');
  let dateObj;
  switch(true) {
    case (isUnix(dateStr)): {
      const date = new Date(Number(dateStr) * 1000);
      const [month, day, year] = [
        capitalize(MONTHS[date.getUTCMonth()]),
        date.getUTCDate(),
        date.getUTCFullYear(),
      ];
      
      return {
        natural: `${month} ${day}, ${year}`,
        unix: dateStr,
      };
    }r
    case (!!(dateObj = isNatural(dateStr))): {
      dateStr = `${dateObj.month} ${dateObj.day}, ${dateObj.year}`;
      const unix = Date.UTC(dateObj.year, MONTHS.indexOf(dateObj.month.toUpperCase()), dateObj.day) / 1000;

      return {
        natural: dateStr,
        unix: String(unix),
      };
    }
    default: {
      return {
        natural: null,
        unix: null,
      }
    }
  }
};
