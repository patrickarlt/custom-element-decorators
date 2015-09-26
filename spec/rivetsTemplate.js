import test from 'tape-catch';
import rivetsTemplate from '../src/rivetsTemplate.js';

test('should bind a templates with Rivets', function (t) {
  t.plan(1);

  @rivetsTemplate(`
    <h1>{name}</h1>
  `)
  class MockElement extends HTMLElement {
    createdCallback () {
      this.name = 'Mickey Mouse';
      this.h1 = this.querySelectorAll('h1')[0];
    }
  }

  let Mock = document.registerElement('mock-element-template', MockElement);
  let element = new Mock();

  document.body.appendChild(element);

  setTimeout(function () {
    t.equal(element.h1.textContent, 'Mickey Mouse');
  });
});
