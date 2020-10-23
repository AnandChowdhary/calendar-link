import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { stringify } from "query-string";

import { CalendarEvent, NormalizedCalendarEvent, Google, Outlook, Yahoo } from "./interfaces";
import { TimeFormats } from "./utils";

dayjs.extend(utc);

function formatTimes(
  { allDay, startUtc, endUtc }: NormalizedCalendarEvent,
  dateTimeFormat: Exclude<keyof typeof TimeFormats, "allDay">
): { start: string; end: string } {
  const format = TimeFormats[allDay ? "allDay" : dateTimeFormat];
  return { start: startUtc.format(format), end: endUtc.format(format) };
}

export const eventify = (event: CalendarEvent): NormalizedCalendarEvent => {
  const { start, end, duration, reminder, ...rest } = event;
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

  const reminderAlarm = reminder
    ? (() => {
        if (reminder && reminder.length) {
          const value = Number(reminder[0]);
          const unit = reminder[1];
          const when = startUtc.subtract(value, unit);
          const repeat = reminder[2];

          return {
            value,
            unit,
            when,
            repeat,
          };
        }
      })()
    : undefined;
  return {
    ...rest,
    startUtc,
    endUtc,
    reminderAlarm,
  };
};

export const google = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, "dateTimeUTC");
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
  const { start, end } = formatTimes(event, "dateTime");
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location,
  };
  return `https://outlook.live.com/calendar/0/deeplink/compose?${stringify(details)}`.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
    "$1-$2-$3T$4:$5:$6"
  );
};

export const office365 = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, "dateTime");
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location,
  };
  return `https://outlook.office.com/calendar/0/deeplink/compose?${stringify(details)}`.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
    "$1-$2-$3T$4:$5:$6"
  );
};

export const yahoo = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const { start, end } = formatTimes(event, "dateTimeUTC");
  const details: Yahoo = {
    v: 60,
    title: event.title,
    st: start,
    et: end,
    desc: event.description,
    in_loc: event.location,
  };
  return `https://calendar.yahoo.com/?${stringify(details)}`;
};

export const ics = (calendarEvent: CalendarEvent): string => {
  const event = eventify(calendarEvent);
  const formattedDescription: string = (event.description || "")
    .replace(/,/gm, ",")
    .replace(/;/gm, ";")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");

  const formattedLocation: string = (event.location || "")
    .replace(/,/gm, ",")
    .replace(/;/gm, ";")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");

  const { start, end } = formatTimes(event, "dateTimeUTC");

  const alarmChuncks = [
    {
      key: "BEGIN",
      value: "VALARM",
    },
    {
      key: "TRIGGER",
      value: (() => {
        const eventAlarm = event.reminderAlarm;
        if (eventAlarm) {
          //https://www.kanzaki.com/docs/ical/trigger.html
          return "-PT" + eventAlarm.value + eventAlarm.unit[0].toUpperCase();
        }
      })(),
    },
    {
      key: "REPEAT",
      value: (() => {
        const eventAlarm = event.reminderAlarm;
        if (eventAlarm) return eventAlarm.repeat;
      })(),
    },
    {
      key: "ACTION",
      value: "DISPLAY",
    },
    {
      key: "DESCRIPTION",
      value: event.title,
    },
    {
      key: "END",
      value: "VALARM",
    },
  ];

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
  ];

  const calendarSuffix = [
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
      calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
    }
  });
  if (event.reminderAlarm) {
    alarmChuncks.forEach((chunk) => {
      if (chunk.value) {
        calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
      }
    });
  }
  calendarSuffix.forEach((chunk) => {
    if (chunk.value) {
      calendarUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`;
    }
  });

  return `data:text/calendar;charset=utf8,${calendarUrl}`;
};

export { CalendarEvent };
