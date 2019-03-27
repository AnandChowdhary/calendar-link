import dayjs from "dayjs";
import { stringify } from "querystring";
import { CalendarEvent, Google, Outlook, Yahoo } from "./interfaces";

export const eventify = (event: CalendarEvent) => {
  event.start = dayjs(event.start).toDate();
  if (event.duration && event.duration.length && !event.end) {
    const duration = Number(event.duration[0]);
    const unit = event.duration[1];
    event.end = dayjs(event.start)
      .add(duration, unit)
      .toDate();
  }
  return event;
};

export const google = (event: CalendarEvent) => {
  event = eventify(event);
  const startDate: string = dayjs(event.start)
    .toISOString()
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\./g, "");
  const endDate: string = dayjs(event.end)
    .toISOString()
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\./g, "");
  const details: Google = {
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    trp: event.busy,
    dates:
      startDate.substring(0, startDate.length - 4) +
      "Z/" +
      endDate.substring(0, endDate.length - 4) +
      "Z"
  };
  if (event.guests && event.guests.length) {
    details.add = event.guests.join();
  }
  return `https://calendar.google.com/calendar/render?${stringify(details)}`;
};

export const outlook = (event: CalendarEvent) => {
  event = eventify(event);
  const details: Outlook = {
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: dayjs(event.start).format("YYYYMMDD[T]HHmmss"),
    enddt: dayjs(event.end).format("YYYYMMDD[T]HHmmss"),
    subject: event.title,
    body: event.description,
    location: event.location
  };
  return `https://outlook.live.com/owa/?${stringify(details)}`;
};

export const yahoo = (event: CalendarEvent) => {
  event = eventify(event);
  const details: Yahoo = {
    v: 60,
    title: event.title,
    st: dayjs(event.start).format("YYYYMMDD[T]HHmmss"),
    et: dayjs(event.end).format("YYYYMMDD[T]HHmmss"),
    desc: event.description,
    in_loc: event.location
  };
  return `https://calendar.yahoo.com/?${stringify(details)}`;
};
