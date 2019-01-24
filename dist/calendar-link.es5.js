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

export default CalendarLink;
//# sourceMappingURL=calendar-link.es5.js.map
