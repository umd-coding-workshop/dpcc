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

if (document.getElementById('services').value.substr(0, 1) == '{') {
    get_service_inputs().forEach(function (element, index) {
      element.setAttribute("readonly", "true");
    });
}
