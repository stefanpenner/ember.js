(function() {
  bench([100, 1000, 10000, 100000], {
    name: 'ember-object-extend-with-cp',
    descritpion: 'test the cost of extending ember-objects with cps',
    fn: function(n) {
      var obj;

      for (var i = 0; i < n; i++) {
        var klass = Ember.Object.extend({
          template: function() {}.property('templateName')
        });
      }

      return klass;
    }
  });
}());
