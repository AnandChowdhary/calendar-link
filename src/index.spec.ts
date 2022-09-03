import dayjs from "dayjs";

import { google, yahoo, outlook, office365, ics } from "./index";
import { TimeFormats, wrapHttpUrlInAnchorTag } from "./utils";
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

  describe("Outlook", () => {
    test("generate a outlook link without valid http url in the description", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2022-09-03",
        description: "I hope you come to my birthday",
        duration: [2, "hour"],
      };
      const link = outlook(event);
      expect(link).toBe(
        `https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=I%20hope%20you%20come%20to%20my%20birthday&enddt=2022-09-02T18%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2022-09-02T16%3A00%3A00%2B00%3A00&subject=Birthday%20party`
      );
    });

    test("generate a outlook link with valid http url in the description", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2022-09-03T12:00:00.000+00:00",
        description: "I hope you come to my birthday here is the site of the event place https://www.npmjs.com/package/calendar-link  Thank you.",
        duration: [1, "hour"],
      };
      const link = outlook(event);
      const expectedBody = encodeURIComponent(wrapHttpUrlInAnchorTag(event.description) ?? '').replace(/[!'()*]/g, escape);

      expect(link).toBe(
        `https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=${expectedBody}&enddt=2022-09-03T13%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2022-09-03T12%3A00%3A00%2B00%3A00&subject=Birthday%20party`
      );
    });
  
  });
});
