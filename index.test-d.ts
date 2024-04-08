import {expectType} from "tsd";
import cidrRegex, {v4, v6} from "./index.js";

expectType<RegExp>(cidrRegex());
expectType<RegExp>(cidrRegex({exact: true}));
expectType<RegExp>(v4());
expectType<RegExp>(v4({exact: true}));
expectType<RegExp>(v6());
expectType<RegExp>(v6({exact: true}));
