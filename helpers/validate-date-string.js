module.exports = (() => {
  const { MONTHS_AND_DAYS, MONTHS, ABBR_MONTHS } = require('./constants');
  
  const { capitalize } = require('./util');

  function isValidDate(month, day, year) {
    month = month.toUpperCase();
    if (MONTHS_AND_DAYS.hasOwnProperty(month) ||
        // Bitwise negation `~` converts -1 to 0
        !!~ABBR_MONTHS.indexOf(month) ||
        (month >= 1 && month <= 12)) {
          month = formatMonth(month);
          if (day == 29 && isMonthFebruary(month) && isLeapYear(year)) {
            return true;
          }
          else if (day >= 1 && day <= MONTHS_AND_DAYS[month]) {
            return true;
          }
          else {
            return false;
          }
    }
  }

  function isMonthFebruary(month) {
    return month === "FEBRUARY" ||
           month === "FEB" ||
           month == 2;
  }

  function isLeapYear(year) {
    return year % 400 === 0 ||
      (year % 4 === 0 && year % 100 !== 0);
  }

  function formatMonth(month, willCapitalize=false) {
    let newMonth;
    if (Number.isInteger(month) || /\d{1,2}/.test(month)) {
      newMonth = MONTHS[month - 1];
    }
    else if (month.length === 3) {
      newMonth = MONTHS.find(val => val.slice(0, 3) === month);
    }
    else {
      newMonth = month;
    }

    return willCapitalize ? capitalize(newMonth) : newMonth;
  }

  function formatDay(day) {
    return Number(day);
  }

  return {
    isUnix: (dateStr) => dateStr == Number(dateStr),
    isNatural: (dateStr) => {
      dateStr = dateStr.toUpperCase();
      const MONTH_REGEX_STR = `(?:[0-1]?\\d|${MONTHS.join('|')}|${ABBR_MONTHS.join('|')})`,
            DAY_REGEX_STR = '[0-3]?\\d',
            SEPARATOR_REGEX_STR = '[\\s\\-\\/]',
            YEAR_FIRST_REGEX = new RegExp(
          `^\\d{1,4}(${SEPARATOR_REGEX_STR})${MONTH_REGEX_STR}\\1${DAY_REGEX_STR}$`
        ),
            MONTH_FIRST_REGEX = [
              new RegExp(
            `^${MONTH_REGEX_STR}(${SEPARATOR_REGEX_STR})${DAY_REGEX_STR}\\1\\d{1,4}$`
              ),
              new RegExp(
            `^${MONTH_REGEX_STR}\\s${DAY_REGEX_STR},\\s\\d{1,4}$`
              ),
            ];
      
      switch(true) {
        case(YEAR_FIRST_REGEX.test(dateStr)): {
          const [year, month, day] = dateStr.split(new RegExp(SEPARATOR_REGEX_STR));
          if (isValidDate(month, day, year)) {
            return {
              month: formatMonth(month, true),
              day: formatDay(day),
              year,
            };
          }
          return null;
        }
        case(MONTH_FIRST_REGEX.some(regex => regex.test(dateStr))): {
          let [month, day, year] = dateStr.split(new RegExp(SEPARATOR_REGEX_STR));
          day = day.split('').filter(char => char !== ',').join('');
          if (isValidDate(month, day, year)) {
            return {
              month: formatMonth(month, true),
              day: formatDay(day),
              year,
            }
          }
          return null;
        }
        default: {
          return null;
        }
      }            
    }
  }
})();
