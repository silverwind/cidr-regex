export type CidrRegexOptions = {
  /**
  Only match an exact string. Useful with `RegExp#test()` to check if a string is an IP address. *(`false` matches any IP address in a string)*

  @defaultValue false
  */
  readonly exact?: boolean;

  /**
  Whether a `/prefix` must follow the address. `"required"` matches only CIDR, `"optional"` matches both,
  `"none"` matches only bare IP addresses. Combined with `exact: false`, `"none"` matches the address part
  inside a CIDR, so `1.2.3.4/24` yields `1.2.3.4`.

  @defaultValue "required"
  */
  readonly prefix?: "required" | "optional" | "none";
};

// IP regex patterns sourced from ip-regex
const octet = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)";
const v4dotted = `${octet}(?:\\.${octet}){3}`;
const hex = "[\\dA-Fa-f]{1,4}";
// RFC 4007 section 11.2 leaves zone ids implementation-defined, so only exclude what no interface name holds, like ip-bigint
const scopeIdRe = "(?:%[^\\s%/\\0]+)?";
const v6addr = `(?:(?:${hex}:){7}(?:${hex}|:)|(?:${hex}:){6}(?:${v4dotted}|:${hex}|:)|(?:${hex}:){5}(?::${v4dotted}|(?::${hex}){1,2}|:)|(?:${hex}:){4}(?:(?::${hex})?:${v4dotted}|(?::${hex}){1,3}|:)|(?:${hex}:){3}(?:(?::${hex}){0,2}:${v4dotted}|(?::${hex}){1,4}|:)|(?:${hex}:){2}(?:(?::${hex}){0,3}:${v4dotted}|(?::${hex}){1,5}|:)|${hex}:(?:(?::${hex}){0,4}:${v4dotted}|(?::${hex}){1,6}|:)|:(?:(?::${hex}){0,5}:${v4dotted}|(?::${hex}){1,7}|:))${scopeIdRe}`;
// V8 can't extract a first-char filter from the v6 alternation, so this lets global scans skip non-{hex,colon} positions
const v6fast = "(?=[\\dA-Fa-f:])";

// one entry per prefix mode, ordered to match the mode numbering in `regexFor`
const suffixes = (range: string) => [range, `(?:${range})?`, ""];
const v4suffixes = suffixes("/(?:3[0-2]|[12]?\\d)");
const v6suffixes = suffixes("/(?:12[0-8]|1[01]\\d|[1-9]?\\d)");

const V4 = 0;
const V6 = 1;
const V46 = 2;

// 3 families * 3 prefix modes * 2 exactness, compiled on first use as most callers touch one or two
const cache = new Array<RegExp | undefined>(18);

function regexFor(family: number, {exact, prefix = "required"}: CidrRegexOptions): RegExp {
  const mode = prefix === "required" ? 0 : prefix === "optional" ? 1 : 2;
  const index = family * 6 + mode * 2 + (exact ? 1 : 0);

  let re = cache[index];
  if (!re) {
    const v4src = v4dotted + v4suffixes[mode];
    const v6src = v6addr + v6suffixes[mode];
    if (exact) {
      const body = family === V4 ? v4src : family === V6 ? v6src : `(?:${v4src}|${v6src})`;
      re = cache[index] = new RegExp(`^${body}$`);
    } else {
      const v6fastSrc = v6fast + v6src;
      const body = family === V4 ? v4src : family === V6 ? v6fastSrc : `${v4src}|${v6fastSrc}`;
      re = cache[index] = new RegExp(body, "g");
    }
  }

  if (!exact) re.lastIndex = 0;
  return re;
}

export const v4 = (opts: CidrRegexOptions = {}) => regexFor(V4, opts);
export const v6 = (opts: CidrRegexOptions = {}) => regexFor(V6, opts);
const cidrRegex = (opts: CidrRegexOptions = {}) => regexFor(V46, opts);
cidrRegex.v4 = v4;
cidrRegex.v6 = v6;
export default cidrRegex;
