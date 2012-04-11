# interval

A JavaScript library for manipulating time intervals.

# install

```
npm install interval
```

# usage

The primary api is the interval function that takes an object that represents
a time interval and returns the equivalent number of milliseconds.

```JavaScript
var interval = require('interval');
setTimeout(foo, interval({ hours: 2 });  // timeout is 1000*60*60*2
```
The supported units of time are 'days', 'hours', 'minutes', 'seconds'
and 'milliseconds'.  You can use as many or as few units as you want
and they are applied cumulatively. These names were chosen to be consistant
with the conventions of [moment.js](http://momentjs.com), as seen in the 
the add and subtract methods `moment().add({days: 1})`


