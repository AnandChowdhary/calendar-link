import dayjs from "dayjs";
import { stringify } from "querystring";
import { CalendarEvent, Google } from "./interfaces";

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
