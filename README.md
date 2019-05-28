# Calendar Link
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Travis](https://img.shields.io/travis/AnandChowdhary/calendar-link.svg)](https://travis-ci.org/AnandChowdhary/calendar-link)
[![Coverage Status](https://coveralls.io/repos/github/AnandChowdhary/calendar-link/badge.svg?branch=master)](https://coveralls.io/github/AnandChowdhary/calendar-link?branch=master)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/calendar-link.svg)](https://github.com/AnandChowdhary/calendar-link/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/calendar-link.svg)
![NPM type definitions](https://img.shields.io/npm/types/calendar-link.svg)
[![NPM](https://img.shields.io/npm/v/calendar-link.svg)](https://www.npmjs.com/package/calendar-link)

JavaScript library to generate an event link for Google Calendar, Yahoo! Calendar, Microsoft Outlook, etc.

[![NPM](https://nodei.co/npm/calendar-link.png)](https://npm.im/calendar-link/)

### Usage

```js
import { google, outlook, yahoo } from "calendar-link"

// Set event as an object
const event = {
  title: "My birthday party",
  description: "Be there!",
  starts: "2019-12-29 18:00:00 +0100",
  duration: [3, "hour"]
};

// Then fetch the link
google(event); // https://calendar.google.com/calendar/render...
outook(event); // https://outlook.live.com/owa/...
yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
```

### Options

| Property         | Description                 | Allowed values                              |
|------------------|-----------------------------|---------------------------------------------|
| `title` 👍       | Event title                 | String                                      |
| `start` 👍       | Start time                  | JS Date / ISO 8601 string / Unix Timestamp  |
| `end` 🤙         | End time                    | JS Date / ISO 8601 string / Unix Timestamp  |
| `duration` 🤙    | Event duration              | Array with value (Number) and unit (String) |
| `description` 👌 | Information about the event | String                                      |
| `location` 👌    | Event location in words     | String                                      |
| `busy` 👌        | Mark on calendar as busy?   | Boolean                                     |
| `guests` 🤞      | Emails of other guests      | Array of emails (String)                    |

#### Support key

| Emoji | Meaning |
| --- | --- |
| 👍 | Required |
| 🤙 | Any one is required |
| 👌 | Supported but not required |
| 🤞 | Not all calendars support |

## License

MIT © [Anand Chowdhary](https://anandchowdhary.com/?utm_source=github&utm_medium=calendar-link&utm_campaign=readme)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://anandchowdhary.com/?utm_source=github&utm_campaign=about-link"><img src="https://avatars3.githubusercontent.com/u/2841780?v=4" width="100px;" alt="Anand Chowdhary"/><br /><sub><b>Anand Chowdhary</b></sub></a><br /><a href="https://github.com/AnandChowdhary/calendar-link/commits?author=AnandChowdhary" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!