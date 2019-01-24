(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dayjs", "object-to-querystring"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = require("dayjs");
    var object_to_querystring_1 = require("object-to-querystring");
    function sanitizeEvent(event) {
        event.start = dayjs_1.default(event.start).toDate();
        if (event.duration && event.duration.length && !event.end) {
            event.end = dayjs_1.default(event.start)
                .add(event.duration[0], event.duration[1])
                .toDate();
        }
        return event;
    }
    var CalendarLink = /** @class */ (function () {
        function CalendarLink() {
        }
        CalendarLink.prototype.google = function (event) {
            event = sanitizeEvent(event);
            var startDate = dayjs_1.default(event.start)
                .toISOString()
                .replace(/-/g, '')
                .replace(/:/g, '')
                .replace(/\./g, '');
            var endDate = dayjs_1.default(event.end)
                .toISOString()
                .replace(/-/g, '')
                .replace(/:/g, '')
                .replace(/\./g, '');
            var details = {
                action: 'TEMPLATE',
                text: event.title,
                details: event.description,
                location: event.location,
                trp: event.busy,
                dates: startDate.substring(0, startDate.length - 4) +
                    'Z/' +
                    endDate.substring(0, endDate.length - 4) +
                    'Z'
            };
            if (event.guests && event.guests.length) {
                details.add = event.guests.join();
            }
            return 'https://calendar.google.com/calendar/render' + object_to_querystring_1.default(details);
        };
        CalendarLink.prototype.outlook = function (event) {
            event = sanitizeEvent(event);
            var details = {
                path: '/calendar/action/compose',
                rru: 'addevent',
                startdt: dayjs_1.default(event.start).format('YYYYMMDD[T]HHmmss'),
                enddt: dayjs_1.default(event.end).format('YYYYMMDD[T]HHmmss'),
                subject: event.title,
                body: event.description,
                location: event.location
            };
            return 'https://outlook.live.com/owa/' + object_to_querystring_1.default(details);
        };
        CalendarLink.prototype.yahoo = function (event) {
            event = sanitizeEvent(event);
            var details = {
                v: 60,
                title: event.title,
                st: dayjs_1.default(event.start).format('YYYYMMDD[T]HHmmss'),
                et: dayjs_1.default(event.end).format('YYYYMMDD[T]HHmmss'),
                desc: event.description,
                in_loc: event.location
            };
            return 'https://calendar.yahoo.com/' + object_to_querystring_1.default(details);
        };
        return CalendarLink;
    }());
    exports.default = CalendarLink;
});
//# sourceMappingURL=calendar-link.js.map