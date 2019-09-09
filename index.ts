import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { stringify } from "query-string";

import { CalendarEvent, Google, Outlook, Yahoo } from "./interfaces";
import { TimeFormats } from './utils'

dayjs.extend(utc);

export const eventify = (event: CalendarEvent) => {
  event.start = dayjs(event.start).toDate();
  if (event.end == null) {
    if (event.duration && event.duration.length) {
      const duration = Number(event.duration[0]);
      const unit = event.duration[1];
      event.end = dayjs(event.start)
        .add(duration, unit)
        .toDate();
    }
    if (event.allDay) {
      event.end = dayjs(event.start)
        .add(1, "day")
        .toDate();
    }
  }
  return event;
};

export const google = (event: CalendarEvent) => {
  event = eventify(event);
  const format = event.allDay ? TimeFormats.allDay : TimeFormats.dateTimeUTC;
  const start: string = dayjs(event.start)
    .utc()
    .format(format);
  const end: string = dayjs(event.end)
    .utc()
    .format(format);
  const details: Google = {
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    trp: event.busy,
    dates: start + "/" + end
  };
  if (event.guests && event.guests.length) {
    details.add = event.guests.join();
  }
  return `https://calendar.google.com/calendar/render?${stringify(details)}`;
};

export const outlook = (event: CalendarEvent) => {
  event = eventify(event);
  const format = event.allDay ? TimeFormats.allDay : TimeFormats.dateTime;
  const start: string = dayjs(event.start)
    .utc()
    .format(format);
  const end: string = dayjs(event.end)
    .utc()
    .format(format);
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location
  };
  return `https://outlook.live.com/owa/?${stringify(details)}`;
};

export const yahoo = (event: CalendarEvent) => {
  event = eventify(event);
  const format = event.allDay ? TimeFormats.allDay : TimeFormats.dateTimeUTC;
  const start: string = dayjs(event.start)
    .utc()
    .format(format);
  const end: string = dayjs(event.end)
    .utc()
    .format(format);
  const details: Yahoo = {
    v: 60,
    title: event.title,
    st: start,
    et: end,
    desc: event.description,
    in_loc: event.location
  };
  return `https://calendar.yahoo.com/?${stringify(details)}`;
};

export const ics = (event: CalendarEvent) => {
  event = eventify(event);
  const formattedDescription: string = (event.description || "")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");

  const format = event.allDay ? TimeFormats.allDay : TimeFormats.dateTimeUTC;
  const start: string = dayjs(event.start)
    .utc()
    .format(format);
  const end: string = dayjs(event.end)
    .utc()
    .format(format);
  const calendarChunks = [
    {
      key: 'BEGIN',
      value: 'VCALENDAR'
    },
    {
      key: 'VERSION',
      value: '2.0'
    },
    {
      key: 'BEGIN',
      value: 'VEVENT'
    },
    {
      key: 'URL',
      value: document.URL
    },
    {
      key: 'DTSTART',
      value: start
    },
    {
      key: 'DTEND',
      value: end
    },
    {
      key: 'SUMMARY',
      value: event.title
    },
    {
      key: 'DESCRIPTION',
      value: formattedDescription
    },
    {
      key: 'LOCATION',
      value: event.location
    },
    {
      key: 'END',
      value: 'VEVENT'
    },
    {
      key: 'END',
      value: 'VCALENDAR'
    },
  ];

  let calendarUrl: string = '';

  calendarChunks.forEach(chunk => {
    if(chunk.value) {
      calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
    }
  });

  return `data:text/calendar;charset=utf8,${calendarUrl}`;
};
