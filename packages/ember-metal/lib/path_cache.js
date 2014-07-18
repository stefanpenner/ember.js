import dictionary from 'ember-metal/dictionary';

var IS_GLOBAL = /^([A-Z$]|([0-9][A-Z$]))/;
var IS_GLOBAL_PATH = /^([A-Z$]|([0-9][A-Z$])).*[\.]/;
var HAS_THIS  = 'this.';

var isGlobalCache = dictionary(null);
export function isGlobal(path) {
  return isGlobalCache[path] || (
    isGlobalCache[path] = IS_GLOBAL.test(path)
  );
}

var isGlobalPathCache = dictionary(null);
export function isGlobalPath(path) {
  return isGlobalPathCache[path] || (
    isGlobalPathCache[path] = IS_GLOBAL_PATH.test(path)
  );
}


var hasThisCache = dictionary(null);
export function hasThis(path) {
  return hasThisCache[path] || (
    hasThisCache[path] = path.indexOf(HAS_THIS) === 0
  );
}

var isPathCache = dictionary(null);
export function isPath(path) {
  return isPathCache[path] || (
    isPathCache[path] = path.indexOf('.') !== -1
  );
}
