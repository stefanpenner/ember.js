module.exports = function(config) {
  config.set({
    scripts: [
      {
        id: 'ember-object-extend',
        src: 'bench.js',
      }
    ]
  });
};
