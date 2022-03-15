import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { stringify } from "query-string";

import { CalendarEvent, CalendarEventOrganizer, NormalizedCalendarEvent, Google, Outlook, Yahoo } from "./interfaces";
import { TimeFormats } from "./utils";

dayjs.extend(utc);

function formatTimes(
  { allDay, startUtc, endUtc }: NormalizedCalendarEvent,
  dateTimeFormat: keyof typeof TimeFormats
): { start: string; end: string } {
  const format = TimeFormats[dateTimeFormat];
  return { start: startUtc.format(format), end: endUtc.format(format) };
}

export const eventify = (event: CalendarEvent): NormalizedCalendarEvent => {
  const { start, end, duration, ...rest } = event;
  const startUtc = dayjs(start).utc();
  const endUtc = end
    ? dayjs(end).utc()
    : (() => {
        if (event.allDay) {
          return startUtc.add(1, "day");
        }
        if (duration && duration.length == 2) {
          const value = Number(duration[0]);
          const unit = duration[1];
          return startUtc.add(value, unit);
        }
        return dayjs().utc();
      })();
  return {
    ...rest,
    startUtc,
    endUtc,
  };
};

export const google = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
  const details: Google = {
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    trp: event.busy,
    dates: start + "/" + end,
  };
  if (event.guests && event.guests.length) {
    details.add = event.guests.join();
  }
  return `https://calendar.google.com/calendar/render?${stringify(details)}`;
};

export const outlook = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, "dateTimeWithOffset");
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location,
    allday: event.allDay || false
  };
  return `https://outlook.live.com/calendar/0/deeplink/compose?${stringify(details)}`;
};

export const office365 = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, "dateTimeWithOffset");
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location,
    allday: event.allDay || false
  };
  return `https://outlook.office.com/calendar/0/deeplink/compose?${stringify(details)}`;
};

export const yahoo = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
  const details: Yahoo = {
    v: 60,
    title: event.title,
    st: start,
    et: end,
    desc: event.description,
    in_loc: event.location,
    dur: event.allDay ? "allday" : false
  };
  return `https://calendar.yahoo.com/?${stringify(details)}`;
};

export const ics = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const formattedDescription: string = (event.description || "")
    .replace(/,/gm, ",")
    .replace(/;/gm, ";")
    .replace(/\r\n/gm, "\n")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");

  const formattedLocation: string = (event.location || "")
    .replace(/,/gm, ",")
    .replace(/;/gm, ";")
    .replace(/\r\n/gm, "\n")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");

  const { start, end } = formatTimes(event, event.allDay ? "allDay" : "dateTimeUTC");
  const calendarChunks = [
    {
      key: "BEGIN",
      value: "VCALENDAR",
    },
    {
      key: "VERSION",
      value: "2.0",
    },
    {
      key: "BEGIN",
      value: "VEVENT",
    },
    {
      key: "URL",
      value: event.url,
    },
    {
      key: "DTSTART",
      value: start,
    },
    {
      key: "DTEND",
      value: end,
    },
    {
      key: "SUMMARY",
      value: event.title,
    },
    {
      key: "DESCRIPTION",
      value: formattedDescription,
    },
    {
      key: "LOCATION",
      value: formattedLocation,
    },
    {
      key: "ORGANIZER",
      value: event.organizer,
    },
    {
      key: "END",
      value: "VEVENT",
    },
    {
      key: "END",
      value: "VCALENDAR",
    },
  ];

  let calendarUrl: string = "";

  calendarChunks.forEach((chunk) => {
    if (chunk.value) {
      if (chunk.key == "ORGANIZER") {
        const value = chunk.value as CalendarEventOrganizer;
        calendarUrl += `${chunk.key};${encodeURIComponent(`CN=${value.name}:MAILTO:${value.email}\n`)}`;
      } else {
        calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
      }
    }
  });

  return `data:text/calendar;charset=utf8,${calendarUrl}`;
};

export { CalendarEvent };
