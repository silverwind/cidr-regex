# cidr-regex

Regular expression for matching CIDR (Classless Inter-Domain Routing)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/cidr-regex.svg?style=flat-square)](http://npm.im/cidr-regex)
[![MIT License](https://img.shields.io/npm/l/cidr-regex.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![travis build](https://img.shields.io/travis/flipjs/cidr-regex.svg?style=flat-square)](https://travis-ci.org/flipjs/cidr-regex)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![downloads](https://img.shields.io/npm/dm/cidr-regex.svg?style=flat-square)](http://npm-stat.com/charts.html?package=cidr-regex&from=2016-03-24)

## Install

```sh
$ npm install --save cidr-regex
```

## Usage

```js
import cidr from 'cidr-regex' // default regex is cidr v4
import { cidrv4, cidrv6 } from 'cidr-regex'
// OR
var cidrv4 = require('cidr-regex').cidrv4
var cidrv6 = require('cidr-regex').cidrv6

// is a CIDR v4
cidr.test('18.101.25.153/24') // true

// is not a CIDR v4
cidrv4.test('999.999.999.999/12') // false

// is a CIDR v6
cidrv6.test('fe80:0000:0000:0000:0204:61ff:fe9d:f156') // true

// is not a CIDR v6
cidrv6.test('fe80:0000:0000:0000:0204:61ff:fe9d:f156/a') // false
```

## API

### cidr

A regex for matching CIDR IPv4

### cidrv4

A regex for matching CIDR IPv4

### cidrv6

A regex for matching CIDR IPv6

## Other notes

This was inspired by npm package [ip-regex](https://www.npmjs.com/package/ip-regex). I've used the same samples on unit testing for IPv4 and modified for CIDR testing. Other IPv6 test cases were taken from [IPv6 Regex by Dartware, LLC](https://www.helpsystems.com/intermapper/ipv6-test-address-validation) (licensed under CC-BY-SA 3.0).

## License

MIT © [Felipe Apostol](https://github.com/flipjs)

