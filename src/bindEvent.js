/* global Element */

function matches (element, selector) {
  var fn = Element.prototype.matches ||
  Element.prototype.matchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.oMatchesSelector ||
  Element.prototype.webkitMatchesSelector ||
  function (selector) {
    var node = this;
    var nodes = (node.parentNode || node.document).querySelectorAll(selector);
    var i = -1;

    while (nodes[++i] && nodes[i] !== node) {}

    return !!nodes[i];
  };

  return fn.call(element, selector);
}

export default function bindEvent (eventName, selector, handler) {
  var callback;

  if (arguments.length === 2) {
    handler = selector;
    selector = false;
  }

  return function (target) {
    var fn = (typeof handler === 'function') ? handler : target.prototype[handler];

    if (!fn) {
      throw new Error(`@bindEvent: #{handler} does not exist on #{target}`);
    }

    var attachedCallback = target.prototype.attachedCallback || function () {};
    target.prototype.attachedCallback = function () {
      callback = (e) => {
        if (!selector || (selector && matches(e.target, selector))) {
          fn.call(this, e);
        }
      };

      this.addEventListener(eventName, callback, /focus|blur/.test(eventName));

      attachedCallback.call(this);
    };

    var detachedCallback = target.prototype.detachedCallback || function () {};
    target.prototype.detachedCallback = function () {
      this.removeEventListener(eventName, callback);
      detachedCallback.call(this);
    };
  };
}
