#!/usr/bin/env node

const dpcc = require('./dpcc.js');

var service = {
    // rates
    ingest_rate: 310,
    membership_fee: 2750,
    storage_rate: 500,
    // variables
    included_storage: 0,
    storage_increment: 1,
};

// user-supplied
var amount_stored = 50;
var time = 5;

// results
var costs = dpcc.get_costs(service, amount_stored, time);

console.log('Storage cost ($/y): ' + costs.storage);
console.log('   Yearly cost ($): ' + costs.yearly);
console.log('   Ingest cost ($): ' + costs.ingest);
console.log('    Total cost ($): ' + costs.total);
