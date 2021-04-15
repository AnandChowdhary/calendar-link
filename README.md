# 📅 Calendar Link

<!-- prettier-ignore-start -->
|   | Status |
| - | - |
| Build | [![Node CI](https://github.com/AnandChowdhary/calendar-link/workflows/Node%20CI/badge.svg)](https://github.com/AnandChowdhary/calendar-link/actions?query=workflow%3A%22Node+CI%22) [![Dependencies](https://img.shields.io/librariesio/github/AnandChowdhary/calendar-link)](https://libraries.io/github/AnandChowdhary/calendar-link) [![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnandChowdhary/calendar-link)](https://github.com/AnandChowdhary/calendar-link/releases) [![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/calendar-link)](https://snyk.io/test/github/AnandChowdhary/calendar-link) |
| Health | [![License](https://img.shields.io/github/license/anandchowdhary/calendar-link.svg)](https://github.com/AnandChowdhary/calendar-link/blob/master/LICENSE) [![Coverage](https://img.shields.io/coveralls/github/AnandChowdhary/calendar-link)](https://coveralls.io/github/AnandChowdhary/calendar-link) [![Pull Request Labeler](https://github.com/AnandChowdhary/calendar-link/workflows/Pull%20Request%20Labeler/badge.svg)](https://github.com/AnandChowdhary/calendar-link/actions?query=workflow%3A%22Pull+Request+Labeler%22) |
| PRs | [![Feature Branch Pull Request](https://github.com/AnandChowdhary/calendar-link/workflows/Feature%20Branch%20Pull%20Request/badge.svg)](https://github.com/AnandChowdhary/calendar-link/actions?query=workflow%3A%22Feature+Branch+Pull+Request%22) [![Hotfix Branch Pull Request](https://github.com/AnandChowdhary/calendar-link/workflows/Hotfix%20Branch%20Pull%20Request/badge.svg)](https://github.com/AnandChowdhary/calendar-link/actions?query=workflow%3A%22Hotfix+Branch+Pull+Request%22) [![Merge PRs](https://github.com/AnandChowdhary/calendar-link/workflows/Merge%20PRs/badge.svg)](https://github.com/AnandChowdhary/calendar-link/actions?query=workflow%3A%22Merge+PRs%22) |
| Community | ![NPM type definitions](https://img.shields.io/npm/types/calendar-link.svg) [![NPM](https://img.shields.io/npm/v/calendar-link.svg)](https://www.npmjs.com/package/calendar-link) [![All contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors) |
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

| Property           | Description                 | Allowed values                              |
| ------------------ | --------------------------- | ------------------------------------------- |
| `title` (required) | Event title                 | String                                      |
| `start` (required) | Start time                  | JS Date / ISO 8601 string / Unix Timestamp  |
| `end`              | End time                    | JS Date / ISO 8601 string / Unix Timestamp  |
| `duration`         | Event duration              | Array with value (Number) and unit (String) |
| `allDay`           | All day event               | Boolean                                     |
| `description`      | Information about the event | String                                      |
| `location`         | Event location in words     | String                                      |
| `busy`             | Mark on calendar as busy?   | Boolean                                     |
| `guests`           | Emails of other guests      | Array of emails (String)                    |
| `url`              | Calendar document URL       | String                                      |

Any one of the fields `end`, `duration`, or `allDay` is required.

The `url` field defaults to `document.URL` if a global `document` object exists. For server-side rendering, you should supply the `url` manually.

Not all calendars support the `guests` and `url` fields.

## License

MIT © [Anand Chowdhary](https://anandchowdhary.com/?utm_source=github&utm_medium=calendar-link&utm_campaign=readme)
