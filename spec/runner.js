import test from 'tape-catch';

import 'document-register-element';
import './html-element-fix.js';

import './attribute.js';
import './bindEvent.js';
import './rivetsTemplate.js';
import './watchAttribute.js';

test('teardown', function (t) {
  window.close();
  t.end();
});
