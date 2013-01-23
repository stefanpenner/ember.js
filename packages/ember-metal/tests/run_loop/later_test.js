var previousPreventRunloop;

test('should invoke after specified period of time - function only', function() {

  var invoked = false;

  Ember.run(function() {
    Ember.run.later(function() { invoked = true; }, 100);
  });

  stop();

  setTimeout(function() {
    start();
    equal(invoked, true, 'should have invoked later item');
  }, 150);

});


test('should invoke after specified period of time - target/method', function() {

  var obj = { invoked: false } ;

  Ember.run(function() {
    Ember.run.later(obj, function() { this.invoked = true; }, 100);
  });

  stop();

  setTimeout(function() {
    start();
    equal(obj.invoked, true, 'should have invoked later item');
  }, 150);

});


test('should invoke after specified period of time - target/method/args', function() {

  var obj = { invoked: 0 } ;

  Ember.run(function() {
    Ember.run.later(obj, function(amt) { this.invoked += amt; }, 10, 100);
  });

  stop();

  setTimeout(function() {
    start();
    equal(obj.invoked, 10, 'should have invoked later item');
  }, 150);

});

test('should always invokve in next run loop', function(){
  var obj = { },
    scheduledDuring,
    executedDuring;

  Ember.run(function(){
    scheduleDurring = Ember.guidFor(Ember.run.currentRunLoop);

    Ember.run.later(obj, function(amt) {
      executedDuring = Ember.guidFor(Ember.run.currentRunLoop);
    }, 0);

    // do stuff that makes this slow and long...
  });

  stop();

  setTimeout(function(){
    start();
    equal(scheduleDurring !== executedDuring, true,  'bro');
  },50);
});
