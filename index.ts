import ipRegex from "ip-regex";

type CidrRegexOptions = {
  /**
  Only match an exact string. Useful with `RegExp#test()` to check if a string is an IP address. *(`false` matches any IP address in a string)*

  @defaultValue false
  */
  readonly exact?: boolean;
}

const defaultOpts: CidrRegexOptions = {exact: false};
const v4str = `${ipRegex.v4().source}\\/(3[0-2]|[12]?[0-9])`;
const v6str = `${ipRegex.v6().source}\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])`;

// pre-compile only the exact regexes as global flag makes regex objects stateful
const v4exact = new RegExp(`^${v4str}$`);
const v6exact = new RegExp(`^${v6str}$`);
const v46exact = new RegExp(`(?:^${v4str}$)|(?:^${v6str}$)`);

const cidrRegex = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v46exact : new RegExp(`(?:${v4str})|(?:${v6str})`, "g");
export const v4 = cidrRegex.v4 = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v4exact : new RegExp(v4str, "g");
export const v6 = cidrRegex.v6 = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v6exact : new RegExp(v6str, "g");
export default cidrRegex;
