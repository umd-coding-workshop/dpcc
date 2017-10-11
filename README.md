# dpcc

Digital Preservation Cost Calculator

## Quick Start

The latest build from master should always be at
<https://umd-coding-workshop.github.io/dpcc>

## Building and Testing

Requires [NodeJS]. Use [Grunt] and [Browserify] to build and test the Web UI:

```
# install the build tools
npm -g install grunt-cli browserify

# build and run for testing
npm install
grunt
./server.js
```

## Command-Line Program

There is also a [dpcc-cli.js](dpcc-cli.js) script that runs on the command line using NodeJS. It takes two arguments: the amount of data to store, and how long to store it for, and produces a chart of the costs for the various services defined in the [services.json](services.json) file.

```
# install dependencies
npm install

# estimate costs for 50 TB stored for 5 years
./dpcc-cli.js 50 5
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

[NodeJS]: https://nodejs.org/
[Grunt]: https://gruntjs.com/
[Browserify]: http://browserify.org/