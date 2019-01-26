# Calendar Link

[![Greenkeeper badge](https://badges.greenkeeper.io/AnandChowdhary/calendar-link.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/AnandChowdhary/calendar-link.svg)](https://travis-ci.org/AnandChowdhary/calendar-link)
[![Coverage Status](https://coveralls.io/repos/github/AnandChowdhary/calendar-link/badge.svg?branch=master)](https://coveralls.io/github/AnandChowdhary/calendar-link?branch=master)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/calendar-link.svg)](https://github.com/AnandChowdhary/calendar-link/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/calendar-link.svg)
[![Made in Enschede](https://img.shields.io/badge/made%20in-Enschede-brightgreen.svg)](https://cityofenschede.com/)
[![Dev Dependencies](https://david-dm.org/AnandChowdhary/calendar-link/dev-status.svg)](https://david-dm.org/AnandChowdhary/calendar-link?type=dev)

JavaScript library to generate an event link for Google Calendar, Yahoo! Calendar, Microsoft Outlook, etc.

[![NPM](https://nodei.co/npm/calendar-link.png)](https://npm.im/calendar-link/)

### Usage

```js
import calendarLink from 'calendar-link'

calendarLink.google({
  title: 'My birthday party',
  description: 'Be there!',
  starts: '2019-12-29 18:00:00 +0100',
  duration: [3, 'hours']
}); // Returns a link to add this event to your Google Calendar
```

## License

MIT © [Anand Chowdhary](https://anandchowdhary.com/?utm_source=github&utm_medium=calendar-link&utm_campaign=readme)
