export type Options = {
  /**
  Only match an exact string. Useful with `RegExp#test()` to check if a string is an IP address. *(`false` matches any IP address in a string)*

  @default false
  */
  readonly exact?: boolean;
}

/**
@returns A regex for matching IPv4 CIDRs.
*/
export function v4(options?: Options): RegExp;

/**
@returns A regex for matching IPv6 CIDRs.
*/
export function v6(options?: Options): RegExp;

declare const _default: {

  /**
  Regular expression for matching IP addresses in CIDR notation

  @returns A regex for matching both IPv4 and IPv6 CIDRs.

  @example
  ```
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
  ```
  */
  (options?: Options): RegExp,
  v4: typeof v4;
  v6: typeof v6;
};
export default _default;
