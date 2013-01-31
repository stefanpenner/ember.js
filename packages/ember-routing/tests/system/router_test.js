
var app;
module('Routing integration', {
  setup: function(){

  },
  teardown: function(){
    Ember.run(function(){ app.destroy(); });
    Ember.$("#qunit-fixture").empty();
    Ember.View.views = {};
  }
});

function transitionTo(name){
  //Ember.run(function(){
    app.Router.router.transitionTo(name);
  //});
}

function viewCount(){
  return Ember.keys(Ember.View.views).length;
}

test("integration – memory leak regresion", function(){
  expect(5);

  Ember.View.views = {};
  Ember.$("#qunit-fixture").empty();

  Ember.run(function(){
    app = Ember.Application.create({
      rootElement: '#qunit-fixture'
    });

    app.OneView = Ember.View.extend({});
    app.TwoView = Ember.View.extend({});

    app.Router.reopen({
      location: 'none'
    });

    app.Router.map(function()
    {
      this.route("one");
      this.route("two");
    });

    app.register('template', 'application',
      Ember.Handlebars.compile("{{outlet}}")
    );

    Ember.TEMPLATES.index = Ember.Handlebars.compile(
      "<h1>Hi from index</h1>"
    );
  });

  equal(viewCount(), 1);

  Ember.run(function(){
    transitionTo('one');
  });

  Ember.run(function(){
    transitionTo('two');
  });

  equal(viewCount(), 2, 'we should only have the `index`, and `two` views');

  Ember.run(function(){
    transitionTo('one');
  });

  Ember.run(function(){
    transitionTo('two');
  });

  equal(viewCount(), 2, 'we should only have the `index`, and `two` views');

  Ember.run(function(){
    transitionTo('one');
    transitionTo('two');
  });

  //  thats right, 2 transitions in 1 run loop, prevents old view instances from being cleaned up
  equal(viewCount(), 2, 'we should only have the `index`, and `two` views');

  Ember.run(function(){
    transitionTo('one');
    transitionTo('two');
  });

  equal(viewCount(), 2, 'we should only have the `index`, and `two` views');
  Ember.$("#qunit-fixture").empty();
});
