'use strict';

var test = require('tape');
var math = require('../lib/math');

test('math', function (t) {
  t.test('should divide evenly', function (n) {
    var result = math.integerDivision(100, 10);

    n.same(result, { quotient: 10, remainder: 0 });
    n.end();
  });

  t.test('should have remainder', function (n) {
    var result = math.integerDivision(15, 10);

    n.same(result, { quotient: 1, remainder: 5 });
    n.end();
  });
});
