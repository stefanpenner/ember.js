(function() {
  var controller = App.__container__.lookup('controller:application');

  bench([100, 1000, 10000], {
    name: 'ember-rerender-each', 
    descritpion: 'test the cost of fully re-rendering an each',
    fn: function(n, data) {
      Ember.run(function() {
        controller.set('model', data);
      });
    }
  }, function(n) {
    return _.range(n).map(function(i) {
      return {
        firstName: 'John' + i,
        lastName: 'Smith' + i,
      }
    });
  });
}());
