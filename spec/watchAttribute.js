import test from 'tape-catch';
import watchAttribute from '../src/watchAttribute.js';

test('should watch with a passed function', function (t) {
  t.plan(2);

  @watchAttribute('name', function(oldValue, newValue) {
    t.equal(oldValue, null);
    t.equal(newValue, 'Mickey Mouse');
  })
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-watch-fn', MockElement);
  let element = new Mock();

  element.setAttribute('name', 'Mickey Mouse');
})

test('should watch with a function handler', function (t) {
  t.plan(2);

  @watchAttribute('name', 'nameChange')
  class MockElement extends HTMLElement {
    nameChange (oldValue, newValue) {
      t.equal(oldValue, null);
      t.equal(newValue, 'Mickey Mouse');
    }
  }

  let Mock = document.registerElement('mock-element-watch-handler', MockElement);
  let element = new Mock();

  element.setAttribute('name', 'Mickey Mouse');
})
