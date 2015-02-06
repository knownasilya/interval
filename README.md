# interval

A small library for creating and using time intervals using common units
of time instead.

[![Build Status][travis-badge]][travis-badge-url]

## install

`npm install interval` or add `interval` as a dependency in your 
package.json file and `npm install`

## usage

```js
var interval = require('interval');

// set timeouts and intervals more literately
setTimeout(foo, interval({ hours: 2 }));

// the date 10 days from today
var deadline = interval.add(new Date(), { days: 10 });
```
The supported units of time are 'days', 'hours', 'minutes', 'seconds'
and 'milliseconds'.  You can use as many or as few units as you want
and they are applied cumulatively. 

##### `interval(object)`
##### `interval.fromMilliseconds(number)`
##### `interval.normalize(object)`
##### `interval.stringify(number|object)`
##### `interval.add(date|object, object)`
##### `interval.subtract(date|object, object)`

[travis-badge]: https://travis-ci.org/knownasilya/interval.svg?branch=master
[travis-badge-url]: https://travis-ci.org/knownasilya/interval
