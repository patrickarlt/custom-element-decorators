import { bind } from 'rivets';
import stringToDom from './utils/stringToDom.js';

export default function rivitTemplate (templateString, options) {
  var dom = stringToDom(templateString);

  return function (target) {
    var createdCallback = target.prototype.createdCallback || function () {};
    target.prototype.createdCallback = function () {
      this.__rivetsView = bind(dom, this, options);
      this.__rivetsView.unbind();

      if (this.hasChildNodes()) {
        this.insertBefore(dom, this.childNodes[0]);
      } else {
        this.appendChild(dom);
      }

      createdCallback.call(this);
    };

    var attachedCallback = target.prototype.attachedCallback || function () {};
    target.prototype.attachedCallback = function () {
      this.__rivetsView.bind();
      attachedCallback.call(this);
    };

    var detachedCallback = target.prototype.detachedCallback || function () {};
    target.prototype.detachedCallback = function () {
      this.__rivetsView.unbind();
      detachedCallback.call(this);
    };
  };
}
