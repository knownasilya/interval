'use strict';

var util = require('util');
var math = require('./math');

var MILLISECONDS_PER_SECOND = 1000;
var SECONDS_PER_MINUTE = 60;
var MINUTES_PER_HOUR = 60;
var HOURS_PER_DAY = 24;
var DAYS_PER_WEEK = 7;

var MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
var MILLISECONDS_PER_HOUR = MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE;
var MILLISECONDS_PER_DAY = HOURS_PER_DAY * MILLISECONDS_PER_HOUR;
var MILLISECONDS_PER_WEEK = DAYS_PER_WEEK * MILLISECONDS_PER_DAY;

function interval(i) {
  if (typeof i === 'number') {
    // pass through any number as milliseconds
    return i;
  }
  if (!i) {
    // TODO: should we throw an error instead?
    return NaN;
  }

  var weeks = i.weeks || 0,
      days = i.days || 0,
      hours = i.hours || 0,
      minutes = i.minutes || 0,
      seconds = i.seconds || 0,
      milliseconds = i.milliseconds || 0;

  days += weeks * DAYS_PER_WEEK;
  hours += days * HOURS_PER_DAY;
  minutes += hours * MINUTES_PER_HOUR;
  seconds += minutes * SECONDS_PER_MINUTE;
  milliseconds += seconds * MILLISECONDS_PER_SECOND;

  return milliseconds;
}

module.exports = interval;

function fromMilliseconds(i) {
  if (i < 0) {
    // TODO: support negative intervals
    throw new Error('negative intervals are currently not supported');
  }

  var r = math.integerDivision(i, MILLISECONDS_PER_DAY),
    result = {};

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

interval.normalize = function(i) {
  return fromMilliseconds(interval(i));
};

var properties = ['weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

// TODO: format specifiers
interval.stringify = function(i) {
  if (typeof i !== 'object') {
    i = fromMilliseconds(i);
  }

  var result = [];

  // TODO: singular labels when quantity = 1 (e.g '1 hour')
  properties.forEach(function(property) {
    if (i[property]) {
      result.push(i[property].toString() + ' ' + property);
    }
  });

  return result.join(', ');
};

// first parmater can be a date or an interval, second parameter has to
// be an interval
// returns the same type as the first parameter
function add(base, addend) {
  if (util.isDate(base)) {
    return new Date(base.getTime() + interval(addend));
  }
  return interval(base) + interval(addend);
}

interval.add = add;

function subtract(base, subtrahend) {
  return add(base, -interval(subtrahend));
}

interval.subtract = subtract;
