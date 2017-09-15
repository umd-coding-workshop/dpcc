#!/usr/bin/env node

function non_negative(x) {
    return x >= 0 ? x : 0;
}

function get_costs(service, amount_stored, time) {
    var storage_used = non_negative(amount_stored - service.included_storage);
    var storage_required = Math.ceil(storage_used/service.storage_increment) * service.storage_increment;
    var storage_cost = service.storage_rate * storage_required;
    var yearly_cost = storage_cost + service.membership_fee;

    var ingest_cost = service.ingest_rate * amount_stored;
    var total_cost = (time * yearly_cost) + ingest_cost;

    return {
        ingest: ingest_cost,
        storage: storage_cost,
        yearly: yearly_cost,
        total: total_cost,
    };
}

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
var costs = get_costs(service, amount_stored, time);

console.log('Storage cost ($/y): ' + costs.storage);
console.log('   Yearly cost ($): ' + costs.yearly);
console.log('   Ingest cost ($): ' + costs.ingest);
console.log('    Total cost ($): ' + costs.total);
