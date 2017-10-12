(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const dpcc = require('./dpcc.js');

var service = {};
var user = {};

function display_costs() {
  var costs = dpcc.get_costs(window.service, window.user.amount_stored, window.user.time);

  document.getElementById('costs').querySelectorAll('input[name]').forEach(function (element, index) {
    element.value = +costs[element.name];
  });
}

function get_service_inputs() {
  return document.getElementById('service').querySelectorAll('input[name]');
}

function get_user_inputs() {
  return document.getElementById('user').querySelectorAll('input[name]');
}

document.getElementById('services').onchange = function (event) {
  if (this.value.substr(0, 1) == '{') {
    window.service = JSON.parse(this.value);
    get_service_inputs().forEach(function (element, index) {
      element.value = window.service[element.name];
      element.setAttribute("readonly", "true");
    });
    display_costs();
  } else if (this.value == '[Custom Values]') {
    get_service_inputs().forEach(function (element, index) {
      element.removeAttribute("readonly");
    });
  }
};

get_service_inputs().forEach(function (element, index) {
  window.service[element.name] = +element.value;
  element.onchange = function (event) {
    window.service[element.name] = +this.value;
    display_costs();
  };
});


get_user_inputs().forEach(function (element, index) {
  window.user[element.name] = +element.value;
  element.onchange = function (event) {
    window.user[element.name] = +this.value;
    display_costs();
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
