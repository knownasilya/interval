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

interval.stringify = function (obj, format) {
  var result = [];
  var hours = obj.hours || 0;
  var minutes = obj.minutes || 0;
  hours && result.push(hours.toString() +' hours');
  minutes && result.push(minutes.toString() +' minutes');
  return result.join(', ');
}

interval.parse = function (s) {
  throw new Error('not implimented');
}
