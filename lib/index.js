'use strict';

module.exports = timer;

function timer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var name = options.localName === undefined ? 'timer' : options.localName;

  var rates = {
    seconds: { rate: 1e-9, decimals: 4 },
    microseconds: { rate: 1e-6, decimals: 2 },
    nanoseconds: { rate: 1, decimals: 0 }
  };

  var conversion = rates.seconds;
  if (rates[options.unit]) conversion.rate = rates[options.unit].rate;
  if (options.decimals !== undefined && Number.isInteger(options.decimals)) {
    conversion.decimals = options.decimals;
  }

  return function (req, res, next) {
    res.locals[name] = {};
    res.locals[name].time = process.hrtime();

    res.locals[name].getTime = function () {
      var diff = process.hrtime(res.locals[name].time);
      var time = (diff[0] * 1e9 + diff[1]) * conversion.rate;
      return time.toFixed(conversion.decimals);
    };

    next();
  };
}