# 📅 Calendar Link

<!-- prettier-ignore-start -->
|   | Status |
| - | - |
| Build | ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/AnandChowdhary/calendar-link/node.yml) [![Dependencies](https://img.shields.io/librariesio/github/AnandChowdhary/calendar-link)](https://libraries.io/github/AnandChowdhary/calendar-link) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnandChowdhary/calendar-link)](https://github.com/AnandChowdhary/calendar-link/releases) |
| Health | [![License](https://img.shields.io/github/license/anandchowdhary/calendar-link.svg)](https://github.com/AnandChowdhary/calendar-link/blob/master/LICENSE) [![Coverage](https://img.shields.io/coveralls/github/AnandChowdhary/calendar-link)](https://coveralls.io/github/AnandChowdhary/calendar-link) |
| Community | ![NPM type definitions](https://img.shields.io/npm/types/calendar-link.svg) [![NPM](https://img.shields.io/npm/v/calendar-link.svg)](https://www.npmjs.com/package/calendar-link) ![GitHub contributors](https://img.shields.io/github/contributors/AnandChowdhary/calendar-link) |
<!-- prettier-ignore-end -->

JavaScript library to generate an event link for Google Calendar, Yahoo!
Calendar, Microsoft Outlook, etc.

[![NPM](https://nodei.co/npm/calendar-link.png)](https://npm.im/calendar-link/)

### Usage

```js
// Usage with Node.js
const { google, outlook, office365, yahoo, ics } = require("calendar-link");

// Usage with TypeScript or ES6
import { google, outlook, office365, yahoo, ics } from "calendar-link";

// Set event as an object
const event = {
  uid: "your-unqiue-id",
  title: "My birthday party",
  description: "Be there!",
  start: "2019-12-29 18:00:00 +0100",
  duration: [3, "hour"],
};

// Then fetch the link
google(event); // https://calendar.google.com/calendar/render...
outlook(event); // https://outlook.live.com/owa/...
office365(event); // https://outlook.office.com/owa/...
yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
ics(event); // standard ICS file based on https://icalendar.org
```

### Options

| Property           | Description                     | Allowed values                                                                                                                            |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `title` (required) | Event title                     | String                                                                                                                                    |
| `start` (required) | Start time                      | JS Date / ISO 8601 string / Unix Timestamp                                                                                                |
| `end`              | End time                        | JS Date / ISO 8601 string / Unix Timestamp                                                                                                |
| `duration`         | Event duration                  | Array with value (Number) and unit (String)                                                                                               |
| `allDay`           | All day event                   | Boolean                                                                                                                                   |
| `rRule`            | Recurring event                 | iCal [recurrence rule](https://www.rfc-editor.org/rfc/rfc5545#section-3.3.10) string <br />**NOTE:** Only supported by `google` and `ics` |
| `description`      | Information about the event     | String                                                                                                                                    |
| `location`         | Event location in words         | String                                                                                                                                    |
| `busy`             | Mark on calendar as busy?       | Boolean                                                                                                                                   |
| `guests`           | Emails of other guests. This is currently only supported for `google`, `outlook`, `outlookMobile`, `office365`, `office365Mobile` and `msTeams`          | Array of emails (String)                                                                                                                  |
| `url`              | Calendar document URL           | String                                                                                                                                    |
| `uid`              | Unique identifier for the event | String                                                                                                                                    |

#### Notes

- Any one of the fields `end`, `duration`, or `allDay` is required.
- The allowed units in `duration` are listed here: https://day.js.org/docs/en/durations/creating#list-of-all-available-units.
- The `url` field defaults to `document.URL` if a global `document` object exists. For server-side rendering, you should supply the `url` manually.
- Not all calendars support the `guests` and `url` fields. For `guests` support in outlook/office calendar, this has been tested with `outlook` and `office365` [when this PR was implemented](https://github.com/AnandChowdhary/calendar-link/pull/648) but we weren't able to test this with `outlookMobile` and `office365Mobile` so it might not work as expected. However, all outlook/office calendar links have same path and query string structure so we just added them as even if the query string is invalid, it will just be ignored and won't break anything.
- If you don't pass the start and end time in UTC, Google will convert it to UTC but Outlook won't, so it's a good idea to use UTC when passing dates and times
- There are some known issues in Office 365 because of which we can't generate a consistent link in all devices (#542)
- The `uid` field is currently optional and will generate a random ID if not provided. In a future version, this field will be required to ensure proper event identification and deduplication.

## Compatibility

This package uses [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) (Node.js >= 10, 97%+ browsers), but if you need to include a polyfill, you can include [url-search-params-polyfill](https://www.npmjs.com/package/url-search-params-polyfill) first.

## License

MIT © [Anand Chowdhary](https://anandchowdhary.com/?utm_source=github&utm_medium=calendar-link&utm_campaign=readme)
