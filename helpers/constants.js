module.exports = (() => {
  const MONTHS_AND_DAYS = {
    "JANUARY":   31,
    "FEBRUARY":  28,
    "MARCH":     31,
    "APRIL":     30,
    "MAY":       31,
    "JUNE":      30,
    "JULY":      31,
    "AUGUST":    31,
    "SEPTEMBER": 30,
    "OCTOBER":   31,
    "NOVEMBER": 30,
    "DECEMBER":  31,
  };

  const MONTHS = Object.keys(MONTHS_AND_DAYS);
  const ABBR_MONTHS = MONTHS.map(month => month.slice(0, 3));

  return {
    MONTHS_AND_DAYS,
    MONTHS,
    ABBR_MONTHS,
  }
})();
