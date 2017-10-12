function non_negative(x) {
    return x >= 0 ? x : 0;
}

exports.get_costs = function (service, amount_stored, time) {
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
