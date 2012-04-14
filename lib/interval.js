var math = require('./math');


var MILLISECONDS_PER_SECOND = 1000;
var SECONDS_PER_MINUTE = 60;
var MINUTES_PER_HOUR = 60;
var HOURS_PER_DAY = 24;

var MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
var MILLISECONDS_PER_HOUR = MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE;
var MILLISECONDS_PER_DAY = HOURS_PER_DAY * MILLISECONDS_PER_HOUR;

function interval(i) {
  return toMilliseconds(i);
}
module.exports = interval;

function toMilliseconds(i) {
  if (!i) { return 0; } // TODO: shoould we return NaN?
  var days = i.days || 0;
  var hours = i.hours || 0;
  var minutes = i.minutes || 0;
  var seconds = i.seconds || 0;
  var milliseconds = i.milliseconds || 0;

  hours += days * HOURS_PER_DAY;
  minutes += hours * MINUTES_PER_HOUR;
  seconds += minutes * SECONDS_PER_MINUTE;
  milliseconds += seconds * MILLISECONDS_PER_SECOND;

  return milliseconds; 
}


function fromMilliseconds(i) {
  if (i < 0) throw new Error('negative intervals are not supported');

  var result = {};

  var r = math.integerDivision(i, MILLISECONDS_PER_DAY);
  result.days = r.quotient;
  r = math.integerDivision(r.remainder, MILLISECONDS_PER_HOUR);
  result.hours = r.quotient;
  r = math.integerDivision(r.remainder, MILLISECONDS_PER_MINUTE);
  result.minutes = r.quotient;
  r = math.integerDivision(r.remainder, MILLISECONDS_PER_SECOND);
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
