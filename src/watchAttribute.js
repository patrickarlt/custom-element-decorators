export default function watchAttribute (watchAttr, handler) {
  return function (target) {
    var attributeChangedCallback = target.prototype.attributeChangedCallback || function () {};

    var callback = (typeof handler === 'function') ? handler : target.prototype[handler];

    if (!callback) {
      throw new Error(`@watchAttribute: '${handler}' does not exist on '${target.name}'`);
    }

    target.prototype.attributeChangedCallback = function (attr, oldValue, newValue) {
      if (watchAttr === attr) {
        callback.call(this, oldValue, newValue);
      }

      attributeChangedCallback.call(this, attr, oldValue, newValue);
    };
  };
}
