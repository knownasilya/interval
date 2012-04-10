module.exports = interval;

// NOTE: just a stub for now, implimentation coming soon 

// take an object that specifies a number of hours and return milliseconds
function interval(obj) {
  var days = obj.days || 0;
  var hours = obj.hours || 0;
  var minutes = obj.minutes || 0;
  var seconds = obj.seconds || 0;
  var milliseconds = obj.milliseconds || 0;

  hours += days * 24;
  minutes += hours * 60;
  seconds += minutes * 60;
  milliseconds += seconds * 1000;
 
  return milliseconds; 
}

var properties = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];

interval.stringify = function (obj) {
  var result = [];

  properties.forEach(function (property) {
    if (obj[property]) {
      result.push(obj[property].toString() + ' ' + property);
    }
  });

  return result.join(', ');
};

interval.parse = function (s) {
  throw new Error('not implimented');
};
