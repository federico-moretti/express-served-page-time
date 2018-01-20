module.exports = timer;

function timer(options = {}) {
  const name = options.localName === undefined ? 'timer' : options.localName;

  const rates = {
    seconds: { rate: 1e-9, decimals: 4 },
    microseconds: { rate: 1e-6, decimals: 2 },
    nanoseconds: { rate: 1, decimals: 0 },
  };

  const conversion = rates.seconds;
  if (rates[options.unit]) conversion.rate = rates[options.unit].rate;
  if (options.decimals !== undefined && Number.isInteger(options.decimals)) {
    conversion.decimals = options.decimals;
  }

  return (req, res, next) => {
    res.locals[name] = {};
    res.locals[name].time = process.hrtime();

    res.locals[name].getTime = () => {
      const diff = process.hrtime(res.locals[name].time);
      const time = ((diff[0] * 1e9) + diff[1]) * conversion.rate;
      return time.toFixed(conversion.decimals);
    };

    next();
  };
}
