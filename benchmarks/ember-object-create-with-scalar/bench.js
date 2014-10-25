(function() {
  bench([100, 1000, 10000, 100000], {
    name: 'ember-object-with-scalar',
    description: 'test the cost of creating ember-objects with scalar properties',
    fn: function(n) {
      var obj;

      for (var i = 0; i < n; i++) {
        obj = Ember.Object.create({
          foo: 'bar'
        }); 
      }

      return obj;
    }
  });
}());
