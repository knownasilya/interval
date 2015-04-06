# interval

A small library for creating and using time intervals using common units
of time instead.

[![NPM][npm-badge]][npm-badge-url]  
[![Build Status][travis-badge]][travis-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]

## install

`npm install interval --save`

## usage

```js
var interval = require('interval');

// set timeouts and intervals more literately
setTimeout(foo, interval({ hours: 2 }));

// the date 10 days from today
var deadline = interval.add(new Date(), { days: 10 });
```

The supported units of time are:

* 'weeks'
* 'days'
* 'hours'
* 'minutes'
* 'seconds'
* 'milliseconds'

You can use as many or as few units as you want
and they are applied cumulatively.

##### `interval(object)`
##### `interval.fromMilliseconds(number)`
##### `interval.normalize(object)`
##### `interval.stringify(number|object)`
##### `interval.add(date|object, object)`
##### `interval.subtract(date|object, object)`

[travis-badge]: https://travis-ci.org/knownasilya/interval.svg?branch=master
[travis-badge-url]: https://travis-ci.org/knownasilya/interval
[david-dev-badge]: https://david-dm.org/knownasilya/interval/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/knownasilya/interval#info=devDependencies
[coveralls-badge]: https://coveralls.io/repos/knownasilya/interval/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/r/knownasilya/interval?branch=master
[npm-badge]: https://nodei.co/npm/interval.png?downloads=true&stars=true
[npm-badge-url]: https://nodei.co/npm/interval/
