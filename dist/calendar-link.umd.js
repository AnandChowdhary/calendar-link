(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.calendarLink = factory());
}(this, function () { 'use strict';

  function sanitizeEvent(event) {
      if (event.duration && !event.end) {
          event.end = new Date();
      }
      return event;
  }
  var CalendarLink = /** @class */ (function () {
      function CalendarLink(event) {
      }
      CalendarLink.prototype.google = function (event) {
          event = sanitizeEvent(event);
          var baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
          return "" + baseUrl;
      };
      CalendarLink.prototype.yahoo = function (event) {
          event = sanitizeEvent(event);
          return JSON.stringify(event);
      };
      CalendarLink.prototype.outlook = function (event) {
          event = sanitizeEvent(event);
          return JSON.stringify(event);
      };
      return CalendarLink;
  }());

  return CalendarLink;

}));
//# sourceMappingURL=calendar-link.umd.js.map
