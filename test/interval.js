var expect = require('expect.js');
var interval = require('../');

describe('interval', function() {

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

  it('should convert days property to milliseconds', function() {
    expect(interval({ days: 4 })).to.be(4 * 24 * 60 * 60 * 1000);
  });

  it('should convert hours property to milliseconds', function() {
    expect(interval({ hours: 2 })).to.be(2 * 60 * 60 * 1000);
  });

  it('should convert minutes property to milliseconds', function() {
    expect(interval({ minutes: 6 })).to.be(6 * 60 * 1000);
  });

  it('should convert seconds property to milliseconds', function() {
    expect(interval({ seconds: 25 })).to.be(25 * 1000);
  });

  it('should convert milliseconds property to milliseconds', function() {
    expect(interval({ milliseconds: 25 })).to.be(25);
  });

  it('should convert composite units to milliseconds', function() {
    var actual = interval({ hours: 7, milliseconds: 43 });
    expect(actual).to.be(7 * 60 * 60 * 1000 + 43);
  });

  it('should return numeric parameter as milliseconds', function() {
    expect(interval(852)).to.be(852);
  });

  it('should stringify hours', function() {
    expect(interval.stringify({ hours: 1 })).to.be('1 hours');
  });

  it('should stringify minutes', function() {
    expect(interval.stringify({ minutes: 1 })).to.be('1 minutes');
  });

  it('should build object from milliseconds', function() {
    var actual = interval.fromMilliseconds((50 * 1000) + 40);
    var expected = create({ seconds: 50, milliseconds: 40 });
    expect(actual).to.eql(expected);
  });

  it('should normalize over accounted units', function() {
    var source = { seconds: 75 };
    var expected = create({ minutes: 1, seconds: 15 });
    expect(interval.normalize(source)).to.eql(expected);
  });

  it('should add interval to date', function() {
    var date = new Date(2000, 1, 2);
    var actual = interval.add(date, {days: 1});
    var expected = new Date(2000, 1, 3);
    expect(actual).to.eql(expected);
  });

  it('should add negative interval to date', function() {
    var date = new Date(2000, 1, 2);
    var actual = interval.add(date, {days: -1});
    var expected = new Date(2000, 1, 1);
    expect(actual).to.eql(expected);
  });

  it('should subtract interval from date', function() {
    var date = new Date(2100, 5, 10);
    var actual = interval.subtract(date, {days: 7});
    var expected = new Date(2100, 5, 3);
    expect(actual).to.eql(expected);
  });

  it('should add intervals', function() {
    var actual = interval.add({hours: 5}, {days: 7});
    expect(actual).to.eql(interval({hours: 5, days: 7}));
  });
});
