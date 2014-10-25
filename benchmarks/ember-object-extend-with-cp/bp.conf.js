module.exports = function(config) {
  config.set({
    scripts: [
      {
        id: 'ember-object-extend-with-cp',
        src: 'bench.js',
      }
    ]
  });
};
