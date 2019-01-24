function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var objToQuery = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var objectToQuery = function objectToQuery(input) {
  return input ? ('?' + Object.keys(input).filter(function (key) {
    return Boolean(input[key]) || input[key] === 0;
  }).map(function (key) {
    return [].concat(input[key]).map(function (val) {
      return key + '=' + encodeURIComponent(val);
    }).join('&');
  }).join('&')).trim() : '?';
};

exports.default = objectToQuery;
});

unwrapExports(objToQuery);

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _objToQuery2 = _interopRequireDefault(objToQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _objToQuery2.default;
});

var objectToQuery = unwrapExports(lib);

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
        var details = {
            action: "TEMPLATE",
            text: event.title,
            details: event.description,
            location: event.location,
            trp: event.busy,
            dates: "20201231T193000Z/20201231T223000Z"
        };
        if (event.guests && event.guests.length) {
            details.add = event.guests.join();
        }
        return "https://calendar.google.com/calendar/render" + objectToQuery(details);
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
