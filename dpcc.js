#!/usr/bin/env node

function non_negative(x) {
    return x >= 0 ? x : 0;
}

// rates
var ingest_rate = 310;
var membership_fee = 2750;
var storage_rate = 500;

// variables
var included_storage = 0;
var storage_increment = 1;

// user-supplied
var amount_stored = 50;
var time = 5;

var storage_used = non_negative(amount_stored - included_storage);

var storage_cost = storage_rate * Math.ceil(storage_used/storage_increment) * storage_increment;
var yearly_cost = storage_cost + membership_fee;

var ingest_cost = ingest_rate * amount_stored;
var total_cost = (time * yearly_cost) + ingest_cost;

console.log(storage_cost);
console.log(yearly_cost);
console.log(ingest_cost);
console.log(total_cost);
