type CidrRegexOptions = {
  /**
  Only match an exact string. Useful with `RegExp#test()` to check if a string is an IP address. *(`false` matches any IP address in a string)*

  @defaultValue false
  */
  readonly exact?: boolean;
};

// IP regex patterns sourced from ip-regex
const octet = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)";
const v4dotted = `${octet}(?:\\.${octet}){3}`;
const hex = "[a-fA-F\\d]{1,4}";
const v4src = `${v4dotted}\\/(3[0-2]|[12]?[0-9])`;
const v6src = `(?:(?:${hex}:){7}(?:${hex}|:)|(?:${hex}:){6}(?:${v4dotted}|:${hex}|:)|(?:${hex}:){5}(?::${v4dotted}|(?::${hex}){1,2}|:)|(?:${hex}:){4}(?:(?::${hex})?:${v4dotted}|(?::${hex}){1,3}|:)|(?:${hex}:){3}(?:(?::${hex}){0,2}:${v4dotted}|(?::${hex}){1,4}|:)|(?:${hex}:){2}(?:(?::${hex}){0,3}:${v4dotted}|(?::${hex}){1,5}|:)|${hex}:(?:(?::${hex}){0,4}:${v4dotted}|(?::${hex}){1,6}|:)|:(?:(?::${hex}){0,5}:${v4dotted}|(?::${hex}){1,7}|:))(?:%[0-9a-zA-Z]+)?\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])`;
// V8 can't extract a first-char filter from the v6 alternation; the explicit lookahead
// lets scans short-circuit at non-{hex,colon} positions. Only applied to global forms.
const v6srcFast = `(?=[\\dA-Fa-f:])${v6src}`;

// pre-compile all regexes at module level
const v4exact = new RegExp(`^${v4src}$`);
const v6exact = new RegExp(`^${v6src}$`);
const v46exact = new RegExp(`^(?:${v4src}|${v6src})$`);
const v4global = new RegExp(v4src, "g");
const v6global = new RegExp(v6srcFast, "g"); // eslint-disable-line regexp/no-useless-assertions -- lookahead is a perf hint, not a constraint
const v46global = new RegExp(`${v4src}|${v6srcFast}`, "g"); // eslint-disable-line regexp/no-useless-assertions -- lookahead is a perf hint, not a constraint

function resetRegex(re: RegExp): RegExp {
  re.lastIndex = 0;
  return re;
}

const cidrRegex = ({exact}: CidrRegexOptions = {}) => exact ? v46exact : resetRegex(v46global);
export const v4 = cidrRegex.v4 = ({exact}: CidrRegexOptions = {}) => exact ? v4exact : resetRegex(v4global);
export const v6 = cidrRegex.v6 = ({exact}: CidrRegexOptions = {}) => exact ? v6exact : resetRegex(v6global);
export default cidrRegex;
