import Map from 'ember-metal/map';
import { create } from "ember-metal/platform";

/**
  @class MapWithDefault
  @namespace Ember
  @extends Ember.Map
  @private
  @constructor
  @param [options]
    @param {*} [options.defaultValue]
*/
function MapWithDefault(options) {
  this._super$Constructor();
  this.defaultValue = options.defaultValue;
}

/**
  @method create
  @static
  @param [options]
    @param {*} [options.defaultValue]
  @return {Ember.MapWithDefault|Ember.Map} If options are passed, returns
    `Ember.MapWithDefault` otherwise returns `Ember.Map`
*/
MapWithDefault.create = function(options) {
  if (options) {
    return new MapWithDefault(options);
  } else {
    return new Map();
  }
};

MapWithDefault.prototype = create(Map.prototype);
MapWithDefault.prototype.constructor = MapWithDefault;
MapWithDefault.prototype._super$Constructor = Map;
MapWithDefault.prototype._super$get = Map.prototype.get;
MapWithDefault.prototype._super$copy = Map.prototype.copy;

/**
  Retrieve the value associated with a given key.

  @method get
  @param {*} key
  @return {*} the value associated with the key, or the default value
*/
MapWithDefault.prototype.get = function(key) {
  var hasValue = this.has(key);

  if (hasValue) {
    return this._super$get(key);
  } else {
    var defaultValue = this.defaultValue(key);
    this.set(key, defaultValue);
    return defaultValue;
  }
};

MapWithDefault.prototype.copy = function() {
  return this._super$copy({
    defaultValue: this.defaultValue
  });
};

export default MapWithDefault;
