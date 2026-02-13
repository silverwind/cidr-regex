type CidrRegexOptions = {
  /**
  Only match an exact string. Useful with `RegExp#test()` to check if a string is an IP address. *(`false` matches any IP address in a string)*

  @defaultValue false
  */
  readonly exact?: boolean;
};

const defaultOpts: CidrRegexOptions = {exact: false};
// IP regex patterns sourced from ip-regex
const v4src = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}\\/(3[0-2]|[12]?[0-9])";
const v6src = "(?:(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4})?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|[a-fA-F\\d]{1,4}:(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|:(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))(?:%[0-9a-zA-Z]+)?\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])";
const v46src = `${v4src}|${v6src}`;

// pre-compile all regexes at module level
const v4exact = new RegExp(`^${v4src}$`);
const v6exact = new RegExp(`^${v6src}$`);
const v46exact = new RegExp(`^${v4src}$|^${v6src}$`);
const v4global = new RegExp(v4src, "g");
const v6global = new RegExp(v6src, "g");
const v46global = new RegExp(v46src, "g");

function resetRegex(re: RegExp): RegExp {
  re.lastIndex = 0;
  return re;
}

const cidrRegex = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v46exact : resetRegex(v46global);
export const v4 = cidrRegex.v4 = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v4exact : resetRegex(v4global);
export const v6 = cidrRegex.v6 = ({exact}: CidrRegexOptions = defaultOpts) => exact ? v6exact : resetRegex(v6global);
export default cidrRegex;
