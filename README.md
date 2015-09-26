# ES 7 Decorators for Custom Elements

[Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) are one of the most exciting new specifications to come out in the last few years. But they often contain lots of boilerplate code for setting up templates, events, attributes, ect...

Enter [ES 7 Decorators](https://github.com/wycats/javascript-decorators) which can be used to quickly setup all this boilerplate code.

```js
import {
  attribute,
  watchAttribute,
  bindEvent,
  rivetsTemplate} from 'custom-element-decorators';

@attribute('name', 'String')
@attribute('disabled', 'Boolean')
@watchAttribute('name', 'nameChanged')
@bindEvent('form', 'submit', 'handleSubmit')
@rivetsTemplate(`
  <h1>Editing {name}</h1>
  <form>
    <input type="text" rv-value="name" placeholder="Name" />
    <input type="submit" value="Done" rv-disabled="disabled"/>
  </form>
`);
class UserEditForm extends HTMLElement {
  createdCallback () {
      this.nameInput = this.querySelectorAll('input[type="text"]')[0];
  }

  nameChanged (oldValue, newValue) {
    console.log('name changed from ${oldValue} to ${newValue}');
  }

  handleSubmit (e) {
    this.disabled = true;

    // ... do something to update users name

    this.name = this.nameInput.value;

    e.preventDefault();
    e.stopPropagation();
  }
}

// register the element with document.registerElement for the declarative API
// <user-edit-form name="Mickey Mouse"></user-edit-form>
var UserEditFormElement = document.registerElement('user-edit-form', UserEditForm);

// export a function for a programatic API that will return a DOM element
// with the attributes setup
//
// import UserEditForm from 'user-edit-form';
//
// var form = UserEditForm({
//   name: "Donald Duck",
//   disabled: false
// });
//
// document.body.appendChild(form);
export default function (attributes) {
  return Object.assign(new UserEditFormElement(), attributes);
}
```

## `@attribute`

Setup a custom HTML attribute on your custom element.

```js
import { attribute } from 'custom-element-decorators';

@attribute('name', 'String')
@attribute('count', 'Number')
@attribute('created', 'Date')
@attribute('readonly', 'Boolean')
class MyElement extends HTMLElement {

}

export default document.registerElement('my-element', MyElement);
```

You can access all of your `@attribute` declarations as plain properties with custom getters and setter just like regular HTML elements. This makes property binding in frameworks like Aurelia easier.

```html
<my-element name="Micky Mouse" count="1" created="November 18, 1928
" readonly></my-element>
```

```js
var myElement = document.getElementByTagName('my-element')[0];

console.log(myElement.name);

myElement.name = 'Donald Duck';
```

## `@watchAttribute`

Watching for changes to attributes results in a significant amount of boilerplate when making custom elements, you can use the `@watchAttribute` decorator to watch for changes to specific attributes.

```js
import { watchAttribute } from 'custom-element-decorators';

@watchAttribute('name', 'nameChanged')
@watchAttribute('count', function (oldValue, newValue) {
  console.log(`count changed from ${oldValue} to ${newValue} on ${this}`);
})
class MyElement extends HTMLElement {
  nameChanged (oldValue, newValue) {
    console.log(`count changed from ${oldValue} to ${newValue} on ${this}`);
  }
}

export default document.registerElement('my-element', MyElement);
```

The `@watchAttribute` decorator takes the name of the attribute you want to watch as the first parameter and either an anonymous function or name of a function on your class as the second. The value of `this` in your function will be bound to the instance of the element.

## `@bindEvent`

Listening for events on custom elements is a common task that can be easily handled with the `@bindEvent` decorator which will automatically bind and unbind listeners when the element is added and remove from the DOM.

```js
import { bindEvent } from 'custom-element-decorators';

@bindEvent('click', 'handleClick')
@bindEvent('submit', 'form', function (e) {
  console.log(`child <form> element of ${this} fired submit event`);
})
class MyElement extends HTMLElement {
  handleClick (e) {
    console.log('${this} clicked')
  }
}

export default document.registerElement('my-element', MyElement);
```

`@bindEvent` takes the name of the event as the first argument, a CSS selector to filter the events to specific elements and finally the name of a handler function on your class or an anonymous function. You can omit the selector to bind the event directly to your custom element.

## `@rivetsTemplate`

[Rivets JS](http://rivetsjs.com/) is a lightweight data binding library which is particularly useful for complex custom elements that need a richer template and data binding solution.

```js
import { attribute, rivetsTemplate } from 'custom-element-decorators';

@attribute('name', 'String')
@attribute('description', 'String')
@attribute('expaned', 'Boolean')
@rivetsTemplate(`
  <div class="panel">
    <h1>{name}</h1>
    <p class="details" rv-show="expanded">{description}</p>
  </div>
`)
class MyElement extends HTMLElement {

}

export default document.registerElement('my-element', MyElement);
```

The `@rivetsTemplate` decorator takes a template string as its first argument and optionally any [Rivets configuration](http://rivetsjs.com/docs/guide/#usage-configuring) as the second argument.

Your custom element is bound as the data source for the template do you can interpolate and bind any property on your element (not just attributes) and use any part of the [Rivets JS](http://rivetsjs.com/)
