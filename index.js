const { env, create } = require("sanctuary");
const $ = require("sanctuary-def");
const $F = require("fluture-sanctuary-types");
const { Future } = require("fluture");
const flutureEnv = $F.env;
const FutureType = $F.FutureType;

const S = create({ checkTypes: true, env: env.concat(flutureEnv) });
$.test(env)(FutureType($.String)($.Number))(Future.of(1));
