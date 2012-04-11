var expect = require('expect.js');
var math = require('../lib/math');

describe('math', function () {

  it('should divide evenly', function () {
    var result = math.integerDivision(100, 10);
    expect(result).to.eql({ quotient: 10, remainder: 0});
  });
  
  it('should have remainder', function () {
    var result = math.integerDivision(15, 10);
    expect(result).to.eql({ quotient: 1, remainder: 5});
  });
});
