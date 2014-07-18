/**
@module ember-metal
*/

import { set } from "ember-metal/property_set";
import { guidFor } from "ember-metal/utils";
import { indexOf } from "ember-metal/array";
import { create } from "ember-metal/platform";

function copy(obj) {
  var output = {};

  for (var prop in obj) {
    // hasOwnPropery is not needed because obj is Object.create(null);
    output[prop] = obj[prop];
  }

  return output;
}

/**
  This class is used internally by Ember and Ember Data.
  Please do not use it at this time. We plan to clean it up
  and add many tests soon.

  @class OrderedSet
  @namespace Ember
  @constructor
  @private
*/
function OrderedSet() {
  this.clear();
}

/**
  @method create
  @static
  @return {Ember.OrderedSet}
*/
OrderedSet.create = function() {
  return new OrderedSet();
};

OrderedSet.prototype = {
  /**
    @method clear
  */
  clear: function() {
    this.presenceSet = create(null);
    this.list = [];
  },

  /**
    @method add
    @param obj
  */
  add: function(obj) {
    var guid = guidFor(obj);
    var presenceSet = this.presenceSet;
    var list = this.list;

    if (presenceSet[guid]) { return; }

    presenceSet[guid] = true;
    list.push(obj);
  },

  /**
    @method remove
    @param obj
  */
  remove: function(obj) {
    var guid = guidFor(obj);
    var presenceSet = this.presenceSet;
    var list = this.list;

    if (presenceSet[guid]) {
      delete presenceSet[guid];

      var index = indexOf.call(list, obj);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
  },

  /**
    @method isEmpty
    @return {Boolean}
  */
  isEmpty: function() {
    return this.list.length === 0;
  },

  /**
    @method has
    @param obj
    @return {Boolean}
  */
  has: function(obj) {
    var guid = guidFor(obj);
    var presenceSet = this.presenceSet;

    return presenceSet[guid];
  },

  /**
    @method forEach
    @param {Function} fn
    @param self
  */
  forEach: function(fn, self) {
    // allow mutation during iteration
    var list = this.toArray();

    for (var i = 0, j = list.length; i < j; i++) {
      fn.call(self, list[i]);
    }
  },

  /**
    @method toArray
    @return {Array}
  */
  toArray: function() {
    return this.list.slice();
  },

  /**
    @method copy
    @return {Ember.OrderedSet}
  */
  copy: function() {
    var set = new OrderedSet();

    set.presenceSet = copy(this.presenceSet);
    set.list = this.toArray();

    return set;
  }
};

export default OrderedSet;
