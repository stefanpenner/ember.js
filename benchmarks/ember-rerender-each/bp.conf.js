module.exports = function(config) {
  config.set({
    scripts: [
      {
        id: 'ember-rerender-each',
        src: 'bench.js',
      }
    ]
  });
};
