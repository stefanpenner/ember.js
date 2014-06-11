/* globals RSVP:true */

import Ember from 'ember-metal/core';
import Logger from 'ember-metal/logger';
import {
  Promise,
  EventTarget,
  all,
  allSettled,
  race,
  hash,
  hashSettled,
  rethrow,
  defer,
  denodeify,
  configure,
  on,
  off,
  resolve,
  reject,
  async,
  map,
  filter
} from 'rsvp';

var RSVP = {
  Promise: Promise,
  EventTarget: EventTarget,
  all: all,
  allSettled: allSettled,
  race: race,
  hash: hash,
  hashSettled: hashSettled,
  rethrow: rethrow,
  defer: defer,
  denodeify: denodeify,
  configure: configure,
  on: on,
  off: off,
  resolve: resolve,
  reject: reject,
  async: async,
  map: map,
  filter: filter
};
//import Test from 'ember-testing/test';

export function onerrorDefault(error) {
  if (error instanceof Error) {
    if (Ember.testing) {
      // ES6TODO: remove when possible
      // TODO: make this work, when test package is included, it should provide
      // an addition onerror helper then overrides this one.
      // if (!Test && Ember.__loader.registry[testModuleName]) {
      //   Test = requireModule(testModuleName)['default'];
      // }

      if (Test && Test.adapter) {
        Test.adapter.exception(error);
      } else {
        throw error;
      }
    } else if (Ember.onerror) {
      Ember.onerror(error);
    } else {
      Logger.error(error.stack);
      Ember.assert(error, false);
    }
  }
}

RSVP.on('error', onerrorDefault);

export default RSVP;
