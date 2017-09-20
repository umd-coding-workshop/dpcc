(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const dpcc = require('./dpcc.js');

var service = {};
var user = {};

function display_costs(service, user) {
  var costs = dpcc.get_costs(service, user.amount_stored, user.time);

  document.getElementById('costs').querySelectorAll('input[name]').forEach(function (element, index) {
    element.value = +costs[element.name];
  });
}


document.getElementById('service').querySelectorAll('input[name]').forEach(function (element, index) {
  var name = element.name;
  element.onchange = function (event) {
    service[name] = +this.value;
    display_costs(service, user);
  };
});
document.getElementById('user').querySelectorAll('input[name]').forEach(function (element, index) {
  var name = element.name;
  element.onchange = function (event) {
    user[name] = +this.value;
    display_costs(service, user);
  };
});

},{"./dpcc.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
