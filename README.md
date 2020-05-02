# sanctuary-fluture-test

Testing Sanctuary and Fluture

## Installing Sanctuary

### Installation

Following instrutions from the main [Sanctuary](https://sanctuary.js.org/#section:installation) site:
`npm install sanctuary`

### Results

```
+ sanctuary@3.0.0
added 12 packages from 1 contributor and audited 40 packages in 0.839s
found 0 vulnerabilities
```

## Installing Sanctuary Definitions, Fluture, and Fluture Types

### Installation

From [Fluture Sanctuary Types](https://github.com/fluture-js/fluture-sanctuary-types):
`npm install --save fluture sanctuary-def fluture-sanctuary-types`

### Results

```
npm WARN fluture-sanctuary-types@5.0.0 requires a peer of sanctuary-def@>=0.20.0 <0.21.0 but none is installed. You must install peer dependencies yourself.

+ fluture@12.2.0
+ sanctuary-def@0.21.1
+ fluture-sanctuary-types@5.0.0
updated 3 packages and audited 40 packages in 0.702s
found 0 vulnerabilities
```

## Attempt 1 Doing Minimal Type Checking Test as Found on Fluture Sanctuary Types

Correcting for the extranesous `=` in the import statement

### Code

```
import $ from 'sanctuary-def';
import {env} from 'fluture-sanctuary-types';

const def = $.create ({checkTypes: true, env: $.env.concat (env)});
```

### Results

```
/Users/zbarrow/git/sanctuary-fluture-test/index.js:1
import $ from "sanctuary-def";
       ^

SyntaxError: Unexpected identifier
    at Module._compile (internal/modules/cjs/loader.js:872:18)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:999:10)
    at internal/main/run_main_module.js:17:11
```

## Attempt 2

Reworking my initialization to get rid of errors, and putting things in CommonJS format, it appears I have things right.

### Code

```
const { env, create } = require("sanctuary");
const $ = require("sanctuary-def");
const $F = require("fluture-sanctuary-types");
const flutureEnv = $F.env;
const S = create({ checkTypes: true, env: env.concat(flutureEnv) });
console.log(S.env);
```

### Results (Snippet)

```
  {
    _test: [Function],
    _extractors: {},
    arity: 0,
    extractors: {},
    format: [Function],
    keys: [],
    name: 'Undefined',
    supertypes: [],
    type: 'NULLARY',
    types: {},
    url: 'https://github.com/sanctuary-js/sanctuary-def/tree/v0.21.1#Undefined'
  },
  {
    _test: [Function],
    _extractors: { '$1': [Function: extractLeft], '$2': [Function: extractRight] },
    arity: 2,
    extractors: { '$1': [Function], '$2': [Function] },
    format: [Function],
    keys: [ '$1', '$2' ],
    name: 'Future',
    supertypes: [],
    type: 'BINARY',
    types: { '$1': [Object], '$2': [Object] },
    url: 'https://github.com/fluture-js/Fluture#readme'
  },
  {
    _test: [Function],
    _extractors: { '$1': [Function], '$2': [Function] },
    arity: 2,
    extractors: { '$1': [Function], '$2': [Function] },
    format: [Function],
    keys: [ '$1', '$2' ],
    name: 'ConcurrentFuture',
    supertypes: [],
    type: 'BINARY',
    types: { '$1': [Object], '$2': [Object] },
    url: 'https://github.com/fluture-js/Fluture#concurrentfuture'
  }
]
```

## Example Type Check

### Code

I added the type checking line to the previous code
`$.test(env)(FutureType($.String)($.Number))(Future.of(1));`

### Results

```
$.test(env)(FutureType($.String)($.Number))(Future.of(1));
  ^

ReferenceError: FutureType is not defined
```

There are a couple missing pieces here so I attempt to fix them

## Example Type Check Attempt 2

### Revised Code

I explicitly am trying to reference what is needed to get this to work.

```
const { env, create } = require("sanctuary");
const $ = require("sanctuary-def");
const F = require("fluture");
const Future = F.Future;
const $F = require("fluture-sanctuary-types");
const flutureEnv = $F.env;
const FutureType = $F.FutureType;
const S = create({ checkTypes: true, env: env.concat(flutureEnv) });
console.log(S.env);
$.test(env)(FutureType($.String)($.Number))(Future.of(1));
```

### Results

`TypeError: Future.of is not a function`
