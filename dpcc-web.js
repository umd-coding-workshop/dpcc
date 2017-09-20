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
