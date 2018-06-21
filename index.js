"use strict";

const ipRegex = require("ip-regex");

const cidrPart4 = "\\/(3[0-2]|[12]?[0-9])";
const cidrPart6 = "\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])";
const ip4Re = ipRegex.v4().source;
const ip6Re = ipRegex.v6().source;
const last4Parens = ip4Re.lastIndexOf("(");
const last6Parens = ip6Re.lastIndexOf("(");
const v4 = ip4Re.substring(0, last4Parens) + cidrPart4 + "(" + ip4Re.substring(last4Parens + 1);
const v6 = ip6Re.substring(0, last6Parens) + cidrPart6 + "(" + ip6Re.substring(last6Parens + 1);

const cidrRegex = module.exports = (opts = {}) => {
  if (opts.exact) {
    return new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
  } else {
    return new RegExp(`(?:${v4})|(?:${v6})`, "g");
  }
};

cidrRegex.v4 = opts => opts && opts.exact ? new RegExp(`^${v4}$`) : new RegExp(v4, "g");
cidrRegex.v6 = opts => opts && opts.exact ? new RegExp(`^${v6}$`) : new RegExp(v6, "g");
