var RSVP = requireModule("rsvp");

RSVP.configure('async', function(callback, binding) {
  Ember.run.schedule('actions', binding, callback);
});

/**
@module ember
@submodule ember-runtime
*/

var get = Ember.get;

/**
  @class Deferred
  @namespace Ember
  @extends Ember.Mixin
 */
Ember.DeferredMixin = Ember.Mixin.create({
  /**
    Add handlers to be called when the Deferred object is resolved or rejected.

    @method then
    @param {Function} doneCallback a callback function to be called when done
    @param {Function} failCallback a callback function to be called when failed
  */
  then: function(doneCallback, failCallback) {
    var promise = get(this, 'promise');
    return promise.then.apply(promise, arguments);
  },

  /**
    Resolve a Deferred object and call any `doneCallbacks` with the given args.

    @method resolve
  */
  resolve: null,

  /**
    Reject a Deferred object and call any `failCallbacks` with the given args.

    @method reject
  */
  reject: null,

  init: function() {
    var that, promise;
    that = this;

    this._super();

    promise = new RSVP.Promise(function(resolve, reject){
      // maintain old Deferred api
      that.resolve = resolve;
      that.reject = reject;
    });

    this.set('promise', promise);
  }
});

