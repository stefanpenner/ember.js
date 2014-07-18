import { create } from 'ember-metal/platform';

export default function makeDictionary(parent) {
  var dict = create(parent);
  dict['_dict'] = null;
  delete dict['_dict'];
  return dict;
}
