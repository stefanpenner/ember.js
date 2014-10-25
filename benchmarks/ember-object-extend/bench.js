(function() {
  bench([100, 1000, 10000], {
    name: 'ember-object-extend'
    descritpion: 'test the cost of extending ember-objects',
    fn: function(n) {
      var obj;

      for (var i = 0; i < n; i++) {
        var klass = Ember.Object.extend({ });
      }

      return klass;
    }
  });
}());
