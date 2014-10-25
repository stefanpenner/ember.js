function bench(distributions, options, setup) {
  distributions.forEach(function(n) {
    var setupData = typeof setup === 'function' ? setup(n) : undefined;

    window.benchmarkSteps.push({
      name: options.name + ' (' + n + ')',
      fn: function() {
        return options.fn(n, setupData);
      }
    });
  });
}
