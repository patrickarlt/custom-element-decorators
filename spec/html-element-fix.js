// You can't extend the HTMLElement prototype
// in Safari becuase it is declared as an Object
//
// https://bugs.webkit.org/show_bug.cgi?id=114457
// https://github.com/babel/babel/issues/1548

if (typeof HTMLElement !== 'function') {
  var _HTMLElement = function(){};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}
