# cidr-regex
[![](https://img.shields.io/npm/v/cidr-regex.svg?style=flat)](https://www.npmjs.org/package/cidr-regex) [![](https://img.shields.io/npm/dm/cidr-regex.svg)](https://www.npmjs.org/package/cidr-regex) [![](https://packagephobia.com/badge?p=cidr-regex)](https://packagephobia.com/result?p=cidr-regex) [![](https://depx.co/api/badge/cidr-regex)](https://depx.co/pkg/cidr-regex)

> Regular expression for matching IP addresses in CIDR notation and bare IP addresses

## Usage

```sh
pnpm add cidr-regex
```

```js
import cidrRegex from "cidr-regex";

// Contains a CIDR IP address?
cidrRegex().test("foo 192.168.0.1/24");
//=> true

// Is a CIDR IP address?
cidrRegex({exact: true}).test("foo 192.168.0.1/24");
//=> false

cidrRegex.v6({exact: true}).test("1:2:3:4:5:6:7:8/64");
//=> true

// Extract CIDRs from string
"foo 192.168.0.1/24 bar 1:2:3:4:5:6:7:8/64 baz".match(cidrRegex());
//=> ["192.168.0.1/24", "1:2:3:4:5:6:7:8/64"]

// Is a bare IP address?
cidrRegex({exact: true, prefix: "none"}).test("192.168.0.1");
//=> true

// Is either?
cidrRegex({exact: true, prefix: "optional"}).test("192.168.0.1");
//=> true
cidrRegex({exact: true, prefix: "optional"}).test("192.168.0.1/24");
//=> true
```

## API

All three functions match CIDR notation by default. The `prefix` option switches them to bare IP addresses or to either.

### cidrRegex(options?: CidrRegexOptions)

Returns a regex for matching both IPv4 and IPv6 CIDR IP addresses.

### cidrRegex.v4(options?: CidrRegexOptions)

Returns a regex for matching IPv4 CIDR IP addresses.

### cidrRegex.v6(options?: CidrRegexOptions)

Returns a regex for matching IPv6 CIDR IP addresses.

#### CidrRegexOptions

The options object has the following properties:

- `exact` *boolean*: Only match an exact string. Useful with `RegExp#test()` to check if a string is a CIDR IP address. Default: false.
- `prefix` *string*: Whether a `/prefix` must follow the address. `"required"` matches only CIDR, `"optional"` matches CIDR and bare IP addresses, `"none"` matches only bare IP addresses. Default: `"required"`.

## Related

- [ip-bigint](https://github.com/silverwind/ip-bigint) - Convert IPv4 and IPv6 addresses to native BigInt and vice-versa
- [ip-regex](https://github.com/sindresorhus/ip-regex) - Regular expression for matching IP addresses
- [is-cidr](https://github.com/silverwind/is-cidr) - Check if a string is an IP address in CIDR notation
- [is-ip](https://github.com/sindresorhus/is-ip) - Check if a string is an IP address
- [cidr-tools](https://github.com/silverwind/cidr-tools) - Tools to work with IPv4 and IPv6 CIDR network lists

© [silverwind](https://github.com/silverwind), distributed under BSD licence

Based on previous work by [Felipe Apostol](https://github.com/flipjs)
