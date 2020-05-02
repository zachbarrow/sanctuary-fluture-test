import $ from "sanctuary-def";
import { env } from "fluture-sanctuary-types";

const def = $.create({ checkTypes: true, env: $.env.concat(env) });
