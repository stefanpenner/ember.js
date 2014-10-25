module.exports = function(config) {
  config.set({
    scripts: [
      {
        id: 'ember-object-create',
        src: 'bench.js',
      }
    ]
  });
};
