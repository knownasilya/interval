var expect = require('expect.js');
var interval = require('../');

describe('interval', function () {
 
  it('should convert days property to milliseconds', function () {
    expect(interval({ days: 4 })).to.be(4*24*60*60*1000);
  });

  it('should convert hours property to milliseconds', function () {
    expect(interval({ hours: 2 })).to.be(2*60*60*1000);
  });
  
  it('should convert minutes property to milliseconds', function () {
    expect(interval({ minutes: 6 })).to.be(6*60*1000);
  });

  it('should convert seconds property to milliseconds', function () {
    expect(interval({ seconds: 25 })).to.be(25*1000);
  });
  
  it('should convert milliseconds property to milliseconds', function () {
    expect(interval({ milliseconds: 25 })).to.be(25);
  });

  it('should stringify hours', function () {
    expect(interval.stringify({ hours: 1 })).to.be('1 hours');
  });
  
  it('should stringify minutes', function () {
    expect(interval.stringify({ minutes: 1 })).to.be('1 minutes');
  });

});
