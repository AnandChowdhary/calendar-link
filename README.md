# Calendar Link

[![Travis](https://img.shields.io/travis/AnandChowdhary/calendar-link.svg)](https://travis-ci.org/AnandChowdhary/calendar-link)
[![Coverage Status](https://coveralls.io/repos/github/AnandChowdhary/calendar-link/badge.svg?branch=master)](https://coveralls.io/github/AnandChowdhary/calendar-link?branch=master)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/calendar-link.svg)](https://github.com/AnandChowdhary/calendar-link/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/calendar-link.svg)
![NPM type definitions](https://img.shields.io/npm/types/calendar-link.svg)
[![NPM](https://img.shields.io/npm/v/calendar-link.svg)](https://www.npmjs.com/package/calendar-link)
[![All contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors)

JavaScript library to generate an event link for Google Calendar, Yahoo!
Calendar, Microsoft Outlook, etc.

[![NPM](https://nodei.co/npm/calendar-link.png)](https://npm.im/calendar-link/)

### Usage

```js
import { google, outlook, office365, yahoo,  ics } from "calendar-link";

// Set event as an object
const event = {
  title: "My birthday party",
  description: "Be there!",
  start: "2019-12-29 18:00:00 +0100",
  duration: [3, "hour"]
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

MIT ©
[Anand Chowdhary](https://anandchowdhary.com/?utm_source=github&utm_medium=calendar-link&utm_campaign=readme)

## Contributors

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://anandchowdhary.com/?utm_source=github&utm_campaign=about-link"><img src="https://avatars3.githubusercontent.com/u/2841780?v=4" width="100px;" alt=""/><br /><sub><b>Anand Chowdhary</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=AnandChowdhary" title="Code">💻</a> <a href="https://github.com/AnandChowdhary/calendar-link/commits?author=AnandChowdhary" title="Documentation">📖</a></td>
    <td align="center"><a href="https://keybase.io/lachenmayer"><img src="https://avatars1.githubusercontent.com/u/38614?v=4" width="100px;" alt=""/><br /><sub><b>Harry Lachenmayer</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=lachenmayer" title="Code">💻</a> <a href="https://github.com/AnandChowdhary/calendar-link/commits?author=lachenmayer" title="Documentation">📖</a></td>
    <td align="center"><a href="http://AlexImbrea.com"><img src="https://avatars2.githubusercontent.com/u/4534299?v=4" width="100px;" alt=""/><br /><sub><b>Alexandru-Ionut Imbrea</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=AlexImb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/k4mr4n"><img src="https://avatars1.githubusercontent.com/u/5468009?v=4" width="100px;" alt=""/><br /><sub><b>Kamran Gh</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=k4mr4n" title="Code">💻</a></td>
    <td align="center"><a href="http://paulhebertdesigns.com"><img src="https://avatars3.githubusercontent.com/u/5798536?v=4" width="100px;" alt=""/><br /><sub><b>Paul Hebert</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/issues?q=author%3APaul-Hebert" title="Bug reports">🐛</a> <a href="https://github.com/AnandChowdhary/calendar-link/commits?author=Paul-Hebert" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/omazin"><img src="https://avatars0.githubusercontent.com/u/53472807?v=4" width="100px;" alt=""/><br /><sub><b>Osman Mazinov</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=omazin" title="Documentation">📖</a></td>
    <td align="center"><a href="https://bob.ippoli.to/"><img src="https://avatars0.githubusercontent.com/u/26596?v=4" width="100px;" alt=""/><br /><sub><b>Bob Ippolito</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=etrepum" title="Code">💻</a> <a href="https://github.com/AnandChowdhary/calendar-link/commits?author=etrepum" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
