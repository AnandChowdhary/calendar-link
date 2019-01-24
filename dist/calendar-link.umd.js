(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.calendarLink = factory());
}(this, function () { 'use strict';

  // Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
  var CalendarLink = /** @class */ (function () {
      function CalendarLink() {
          console.log("Hello, world!", event);
      }
      CalendarLink.prototype.google = function (event) {
          return JSON.stringify(event);
      };
      return CalendarLink;
  }());

  return CalendarLink;

}));
//# sourceMappingURL=calendar-link.umd.js.map
