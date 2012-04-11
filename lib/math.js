// TODO: need to consider implications for negative dividends
exports.integerDivision = function integerDivision(dividend, divisor) {
  var result = {};
  result.quotient = Math.floor(dividend / divisor);
  result.remainder = dividend % divisor;
  return result;
}
