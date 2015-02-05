'use strict';

var test = require('tape');
var interval = require('../');

test('interval', function (t) {
  t.test('should convert days property to milliseconds', function (n) {
    n.equal(interval({ days: 4 }), 4 * 24 * 60 * 60 * 1000);
    n.end();
  });

  t.test('should convert hours property to milliseconds', function (n) {
    n.equal(interval({ hours: 2 }), 2 * 60 * 60 * 1000);
    n.end();
  });

  t.test('should convert minutes property to milliseconds', function (n) {
    n.equal(interval({ minutes: 6 }), 6 * 60 * 1000);
    n.end();
  });

  t.test('should convert seconds property to milliseconds', function (n) {
    n.equal(interval({ seconds: 25 }), 25 * 1000);
    n.end();
  });

  t.test('should convert milliseconds property to milliseconds', function (n) {
    n.equal(interval({ milliseconds: 25 }), 25);
    n.end();
  });

  t.test('should convert composite units to milliseconds', function (n) {
    var actual = interval({ hours: 7, milliseconds: 43 });

    n.equal(actual, 7 * 60 * 60 * 1000 + 43);
    n.end();
  });

  t.test('should return numeric parameter as milliseconds', function (n) {
    n.equal(interval(852), 852);
    n.end();
  });

  t.test('should stringify hours', function (n) {
    n.equal(interval.stringify({ hours: 1 }), '1 hours');
    n.end();
  });

  t.test('should stringify minutes', function (n) {
    n.equal(interval.stringify({ minutes: 1 }), '1 minutes');
    n.end();
  });

  t.test('should build object from milliseconds', function (n) {
    var actual = interval.fromMilliseconds((50 * 1000) + 40);
    var expected = create({ seconds: 50, milliseconds: 40 });

    n.same(actual, expected);
    n.end();
  });

  t.test('should normalize over accounted units', function (n) {
    var source = { seconds: 75 };
    var expected = create({ minutes: 1, seconds: 15 });

    n.same(interval.normalize(source), expected);
    n.end();
  });

  t.test('should add interval to date', function (n) {
    var date = new Date(2000, 1, 2);
    var actual = interval.add(date, { days: 1 });
    var expected = new Date(2000, 1, 3);

    n.same(actual, expected);
    n.end();
  });

  t.test('should add negative interval to date', function (n) {
    var date = new Date(2000, 1, 2);
    var actual = interval.add(date, { days: -1 });
    var expected = new Date(2000, 1, 1);

    n.same(actual, expected);
    n.end();
  });

  t.test('should subtract interval from date', function (n) {
    var date = new Date(2100, 5, 10);
    var actual = interval.subtract(date, { days: 7 });
    var expected = new Date(2100, 5, 3);

    n.same(actual, expected);
    n.end();
  });

  t.test('should add intervals', function (n) {
    var actual = interval.add({ hours: 5 }, { days: 7 });

    n.equal(actual, interval({ hours: 5, days: 7 }));
    n.end();
  });
});

// zero undefined properties
function create(i) {
  var props = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];

  props.forEach(function(prop) {
    if (!i[prop]) {
      i[prop] = 0;
    }
  });

  return i;
}
