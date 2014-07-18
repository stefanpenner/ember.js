/**
@module ember-metal
*/

/*
  JavaScript (before ES6) does not have a Map implementation. Objects,
  which are often used as dictionaries, may only have Strings as keys.

  Because Ember has a way to get a unique identifier for every object
  via `Ember.guidFor`, we can implement a performant Map with arbitrary
  keys. Because it is commonly used in low-level bookkeeping, Map is
  implemented as a pure JavaScript object for performance.

  This implementation follows the current iteration of the ES6 proposal for
  maps (http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets),
  with two exceptions. First, because we need our implementation to be pleasant
  on older browsers, we do not use the `delete` name (using `remove` instead).
  Second, as we do not have the luxury of in-VM iteration, we implement a
  forEach method for iteration.

  Map is mocked out to look like an Ember object, so you can do
  `Ember.Map.create()` for symmetry with other Ember classes.
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

function copyMap(original, newObject) {
  var keys = original.keys.slice();
  var values = copy(original.values);

  newObject.keys = keys;
  newObject.values = values;
  newObject.length = original.length;

  return newObject;
}

/**
  A Map stores values indexed by keys. Unlike JavaScript's
  default Objects, the keys of a Map can be any JavaScript
  object.

  Internally, a Map has two data structures:

  1. `keys`: an OrderedSet of all of the existing keys
  2. `values`: a JavaScript Object indexed by the `Ember.guidFor(key)`

  When a key/value pair is added for the first time, we
  add the key to the `keys` OrderedSet, and create or
  replace an entry in `values`. When an entry is deleted,
  we delete its entry in `keys` and `values`.

  @class Map
  @namespace Ember
  @private
  @constructor
*/
function Map() {
  this.keys = [];
  this.values = create(null);
}

Ember.Map = Map;

/**
  @method create
  @static
*/
Map.create = function() {
  return new Map();
};

Map.prototype = {
  constructor: Map,

  /**
    This property will change as the number of objects in the map changes.

    @property length
    @type number
    @default 0
  */
  length: 0,

  /**
    Retrieve the value associated with a given key.

    @method get
    @param {*} key
    @return {*} the value associated with the key, or `undefined`
  */
  get: function(key) {
    var values = this.values;
    var guid = guidFor(key);

    return values[guid];
  },

  /**
    Adds a value to the map. If a value for the given key has already been
    provided, the new value will replace the old value.

    @method set
    @param {*} key
    @param {*} value
  */
  set: function(key, value) {
    var keys = this.keys;
    var values = this.values;
    var guid = guidFor(key);

    if (values[guid] === undefined) {
      keys.push(key);
    }

    values[guid] = value;
    set(this, 'length', keys.length);
  },

  /**
    Removes a value from the map for an associated key.

    @method remove
    @param {*} key
    @return {Boolean} true if an item was removed, false otherwise
  */
  remove: function(key) {
    // don't use ES6 "delete" because it will be annoying
    // to use in browsers that are not ES6 friendly;
    var keys = this.keys;
    var values = this.values;
    var guid = guidFor(key);

    if (values[guid]) {
      var index = indexOf.call(keys, key);
      if (index > -1) {
        keys.splice(index, 1);
      }

      delete values[guid];
      set(this, 'length', keys.length);
      return true;
    } else {
      return false;
    }
  },

  /**
    Check whether a key is present.

    @method has
    @param {*} key
    @return {Boolean} true if the item was present, false otherwise
  */
  has: function(key) {
    var values = this.values;
    var guid = guidFor(key);

    return !!values[guid];
  },

  /**
    Iterate over all the keys and values. Calls the function once
    for each key, passing in the key and value, in that order.

    The keys are guaranteed to be iterated over in insertion order.

    @method forEach
    @param {Function} callback
    @param {*} self if passed, the `this` value inside the
      callback. By default, `this` is the map.
  */
  forEach: function(callback, self) {
    var keys = this.keys;
    var values = this.values;
    var length = keys.length;
    var guid, i, key;

    for (i = 0; i < length; i++) {
      key = keys[i];
      guid = guidFor(key);
      callback.call(self, key, values[guid]);
    }
  },

  /**
    @method copy
    @return {Ember.Map}
  */
  copy: function(options) {
    return copyMap(this, new this.constructor(options));
  }
};

export var copyMap = copyMap;
export default Map;
