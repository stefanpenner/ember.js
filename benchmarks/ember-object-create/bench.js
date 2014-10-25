(function() {
  bench([100, 1000, 10000, 100000], {
    name: 'ember-object-again',
    descritpion: 'test the cost of creating ',
    fn: function(n) {
      var obj;

      for (var i = 0; i < n; i++) {
        obj = Ember.Object.create(); 
      }

      return obj;
    }
  });
}());
