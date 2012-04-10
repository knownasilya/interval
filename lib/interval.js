var math = require('./math');

module.exports = interval;

// take an object that specifies a number of hours and return milliseconds
function interval(i) {
  return toMilliseconds(i);
}

function toMilliseconds(i) {
  var days = i.days || 0;
  var hours = i.hours || 0;
  var minutes = i.minutes || 0;
  var seconds = i.seconds || 0;
  var milliseconds = i.milliseconds || 0;

  hours += days * 24;
  minutes += hours * 60;
  seconds += minutes * 60;
  milliseconds += seconds * 1000;

  return milliseconds; 
}

function fromMilliseconds(i) {
  if (i < 0) throw new Error('intervals cannot be negative');

  var result = {};
  var msPerDay = 24 * 60 * 60 * 1000;
  var msPerHour = 60 * 60 * 1000;
  var msPerMinute = 60 * 1000;
  var msPerSecond = 1000;

  var r = math.integerDivision(i, msPerDay);
  result.days = r.quotient;
  r = math.integerDivision(r.remainder, msPerHour);
  result.hours = r.quotient;
  r = math.integerDivision(r.remainder, msPerMinute);
  result.minutes = r.quotient;
  r = math.integerDivision(r.remainder, msPerSecond);
  result.seconds = r.quotient;
  result.milliseconds = r.remainder;

  return result;
}
interval.fromMilliseconds = fromMilliseconds;

interval.normalize = function (i) {
  return fromMilliseconds(toMilliseconds(i));
};

var properties = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];

// TODO: format specifiers
interval.stringify = function (i) {
  if (typeof i !== 'object') i = fromMilliseconds(i);
  
  var result = [];

  // TODO: singular labels when quantity = 1 (e.g '1 hour')
  properties.forEach(function (property) {
    if (i[property]) {
      result.push(i[property].toString() + ' ' + property);
    }
  });

  return result.join(', ');
};

interval.parse = function (s) {
  throw new Error('not implimented');
};
