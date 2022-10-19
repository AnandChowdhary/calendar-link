import dayjs from "dayjs";

import { google, yahoo, outlook, office365, ics } from "./index";
import { TimeFormats } from "./utils";
import { CalendarEvent } from "./interfaces";

describe("Calendar Links", () => {
  describe("Google", () => {
    test("generate a google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTimeUTC);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`
      );
    });

    test("generate a google link with time & timezone", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29T12:00:00.000+01:00",
        duration: [2, "hour"],
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTimeUTC);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`
      );
    });

    test("generate an all day google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`
      );
    });

    test("generate a multi day google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        end: "2020-01-12",
        allDay: true,
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime = dayjs(event.end).utc().format(TimeFormats.allDay);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&text=Birthday%20party`
      );
    });

    test("generate a recurring google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        rRule: "FREQ=YEARLY;INTERVAL=1"
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTimeUTC);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expectedDates}&recur=RRULE%3AFREQ%3DYEARLY%3BINTERVAL%3D1&text=Birthday%20party`
      );
    });

    test("generate a google link with guests", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        guests: ["hello@example.com", "another@example.com"],
      };
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTimeUTC);
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`);
      const expectedGuests = encodeURIComponent(event.guests ? event.guests.join() : "");
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&add=${expectedGuests}&dates=${expectedDates}&text=Birthday%20party`
      );
    });
  });
});
