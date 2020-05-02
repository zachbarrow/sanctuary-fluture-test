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

From [https://github.com/fluture-js/fluture-sanctuary-types]:
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

I am using Node 12, so I think I am going to have to rework this into the CommonJS syntax.
