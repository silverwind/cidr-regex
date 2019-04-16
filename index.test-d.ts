import {expectType} from "tsd";
import cidrRegex = require(".");

const options: cidrRegex.Options = {};
expectType<RegExp>(cidrRegex());
expectType<RegExp>(cidrRegex({exact: true}));
expectType<RegExp>(cidrRegex.v4());
expectType<RegExp>(cidrRegex.v4({exact: true}));
expectType<RegExp>(cidrRegex.v6());
expectType<RegExp>(cidrRegex.v6({exact: true}));
