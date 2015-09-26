import test from 'tape-catch';
import bindEvent from '../src/bindEvent.js';

function fireEvent (el, etype) {
  var evObj = document.createEvent('Events');
  evObj.initEvent(etype, true, false);
  el.dispatchEvent(evObj);
}

test('should listen for an event on the element with a passed function', function (t) {
  t.plan(1);

  @bindEvent('test', function (e) {
    t.equal(e.type, 'test');
  })
  class MockElement extends HTMLElement {}

  let Mock = document.registerElement('mock-element-event-fn', MockElement);
  let element = new Mock();

  document.body.appendChild(element);

  setTimeout(function () {
    fireEvent(element, 'test');
  });
});

test('should listen for an event on the element with a handler', function (t) {
  t.plan(1);

  @bindEvent('test', 'handleEvent')
  class MockElement extends HTMLElement {
    handleEvent (e) {
      t.equal(e.type, 'test');
    }
  }

  let Mock = document.registerElement('mock-element-event-handler', MockElement);
  let element = new Mock();

  document.body.appendChild(element);

  setTimeout(function () {
    fireEvent(element, 'test');
  });
});

test('should listen for a bubbled event on the element with a handler', function (t) {
  t.plan(1);

  @bindEvent('focus', 'input', 'handleEvent')
  class MockElement extends HTMLElement {
    createdCallback () {
      this.insertAdjacentHTML('afterbegin', '<input type="text">');
      this.input = this.querySelectorAll('input')[0];
    }

    handleEvent (e) {
      t.equal(e.type, 'focus');
    }
  }

  let Mock = document.registerElement('mock-element-event-bubbled', MockElement);
  let element = new Mock();

  document.body.appendChild(element);

  setTimeout(function () {
    element.input.focus();
  });
});
