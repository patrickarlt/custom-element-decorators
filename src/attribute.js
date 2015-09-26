function getter (name, type) {
  switch (type) {
    case 'Boolean':
      return function () {
        return this.hasAttribute(name) || false;
      };
    case 'Number':
      return function () {
        return parseFloat(this.getAttribute(name), 10) || 0;
      };
    case 'Date':
      return function () {
        return new Date(this.getAttribute(name));
      };
    default:
      return function () {
        return this.getAttribute(name) || '';
      };
  }
}

function setter (name, type) {
  switch (type) {
    case 'Boolean':
      return function (value) {
        (value) ? this.setAttribute(name, name) : this.removeAttribute(name);
      };
    case 'Date':
      return function (value) {
        this.setAttribute(name, value.toString());
      };
    default:
      return function (value) {
        this.setAttribute(name, value || '');
      };
  }
}

export default function attribute (name, type) {
  return function (target) {
    Object.defineProperty(target.prototype, name, {
      enumerable: true,
      get: getter(name, type),
      set: setter(name, type)
    });
  };
}
