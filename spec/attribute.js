import test from 'tape-catch';
import attribute from '../src/attribute.js';

test('should get and set a string attribute', function (t) {
  t.plan(2);

  @attribute('name', 'String')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-string-attr', MockElement);
  let element = new Mock();

  element.name = 'Mickey Mouse';
  t.equal(element.getAttribute('name'), 'Mickey Mouse');

  element.setAttribute('name', 'Donald Duck');
  t.equal(element.name, 'Donald Duck');
})

test('should get and set a number attribute', function (t) {
  t.plan(2);

  @attribute('count', 'Number')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-number-attr', MockElement);
  let element = new Mock();

  element.count = 1;
  t.equal(element.getAttribute('count'), '1');

  element.setAttribute('count', 2);
  t.equal(element.count, 2);
})

test('should get and set a boolean attribute', function (t) {
  t.plan(2);

  @attribute('active', 'Boolean')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-bool-attr', MockElement);
  let element = new Mock();

  element.active = true;
  t.equal(element.hasAttribute('active'), true);

  element.removeAttribute('active');
  t.equal(element.active, false);
})

test('empty string should be truthy for boolean attributes', function (t) {
  t.plan(1);

  @attribute('active', 'Boolean')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-bool-attr-empty-string', MockElement);
  let element = new Mock();

  element.setAttribute('active', '');
  t.equal(element.active, true);
})

test('falsey strings should be false for boolean attributes', function (t) {
  t.plan(4);

  @attribute('active', 'Boolean')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-bool-attr-falsey-strings', MockElement);
  let element = new Mock();

  element.active = true;
  element.setAttribute('active', undefined);
  t.equal(element.active, false);

  element.active = true;
  element.setAttribute('active', null);
  t.equal(element.active, false);

  element.active = true;
  element.setAttribute('active', false);
  t.equal(element.active, false);

  element.active = true;
  element.setAttribute('active', 0);
  t.equal(element.active, false);
})

test('should get and set a date attribute', function (t) {
  t.plan(2);

  @attribute('created', 'Date')
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-date-attr', MockElement);
  let element = new Mock();
  let now = new Date();
  let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);

  element.created = now;
  t.equal(element.getAttribute('created'), now.toString());

  element.setAttribute('created', yesterday);
  t.equal(element.created.toString(), yesterday.toString());
})
