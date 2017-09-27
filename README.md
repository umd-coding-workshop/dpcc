# dpcc

Digital Preservation Cost Calculator

## Quick Start

The latest build from master should always be at 
<https://umd-coding-workshop.github.io/dpcc>

## Building and Testing

Use [Browserify] and [Browsersync] to build and test:

```
# install the build tools
npm -g install browserify browser-sync

# build and run for testing
mkdir -p build
cp docs/index.html build
browserify dpcc-web.js -o build/dpcc-web.js
browser-sync start --server build
```

## Initial Brainstorm

```
Dimensions
[$] money
[B] storage
[T] time

Units
dollars, terabytes, years

User supplied inputs
- service (sets the rates and variables)
- amount [B] (e.g., "50 TB")
- time [T] (e.g., "5 years")

Rates
ingest cost    [$]/[B]
membership fee [$]/[T]
storage rate   [$]/[B][T]

Variables
included storage   [B]
storage increment  [B] (e.g., APTrust sells storage in 5TB increments)

Formulas
storage cost = storage rate * ceiling(non_negative(amount - included storage)/storage increment) * storage increment

function non_negative(x) {
  return x >= 0 ? x : 0;
}
```

[Browserify]: http://browserify.org/
[Browsersync]: https://www.browsersync.io/
