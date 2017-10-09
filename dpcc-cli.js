#!/usr/bin/env node

const dpcc = require('./dpcc.js');
const fs = require('fs');
const sprintf = require("sprintf-js").sprintf;

var args = process.argv.slice(2);

// user-supplied
var amount_stored = args[0];
var time = args[1];

if (!amount_stored || !time) {
  console.log('Usage: dpcc-cli.js {amount stored} {time}');
  process.exit(1);
}

console.log('Amount stored: ' + amount_stored + ' TB');
console.log('         Time: ' + time + ' year(s)');
console.log();

var USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

var services = JSON.parse(fs.readFileSync(__dirname + '/services.json'));

var name_lengths = services.map(function (service) { return service.name.length });
var max_length = Math.max(...name_lengths);
var row_template = `%-${max_length}s %18s %18s %18s %18s`;

console.log(
  sprintf(row_template, 'Service', 'Storage Cost ($/y)', 'Yearly Cost ($)', 'Ingest Cost ($)', 'Total Cost ($)')
);

services.forEach(function (service, index) {
  var costs = dpcc.get_costs(service.service, amount_stored, time);

  console.log(
    sprintf(row_template,
      service.name,
      USD.format(costs.storage),
      USD.format(costs.yearly),
      USD.format(costs.ingest),
      USD.format(costs.total)
    )
  );
});
