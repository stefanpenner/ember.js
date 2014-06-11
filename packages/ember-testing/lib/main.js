import "ember-testing/initializers"; // to setup initializer
import "ember-testing/support";      // to handle various edge cases

import setupForTesting from "ember-testing/setup_for_testing";
import Test from "ember-testing/test";
import "ember-testing/helpers";      // adds helpers to helpers object in Test

/**
  Ember Testing

  @module ember
  @submodule ember-testing
  @requires ember-application
*/

export {
  Test,
  setupForTesting
}
