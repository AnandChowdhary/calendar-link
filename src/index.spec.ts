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
  describe("Yahoo", () => {
    test("generate a yahoo link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const link = yahoo(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime: String = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTimeUTC);

      expect(link).toBe(
        `https://calendar.yahoo.com/?et=${eTime}&st=${sTime}&title=Birthday%20party&v=60`
      );
    });

    test("generate an all day yahoo link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const link = yahoo(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: String = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      expect(link).toBe(
        `https://calendar.yahoo.com/?et=${eTime}&st=${sTime}&title=Birthday%20party&v=60`
      );
    });
  });
  describe("Outlook", () => {
    test("generate a outlook link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.dateTime);
      const eTime: String = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTime);
      const link = outlook(event);

      expect(link).toBe(
        `https://outlook.live.com/calendar/0/deeplink/compose?enddt=${eTime}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&subject=Birthday%20party`.replace(
          /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
          "$1-$2-$3T$4:$5:$6"
        )
      );
    });

    test("generate an all day outlook link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const link = outlook(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: String = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      expect(link).toBe(
        `https://outlook.live.com/calendar/0/deeplink/compose?enddt=${eTime}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&subject=Birthday%20party`.replace(
          /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
          "$1-$2-$3T$4:$5:$6"
        )
      );
    });
  });

  describe("Office365", () => {
    test("generate a office365 link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.dateTime);
      const eTime: String = dayjs(event.start).add(2, "hour").utc().format(TimeFormats.dateTime);
      const link = office365(event);

      expect(link).toBe(
        `https://outlook.office.com/calendar/0/deeplink/compose?enddt=${eTime}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&subject=Birthday%20party`.replace(
          /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
          "$1-$2-$3T$4:$5:$6"
        )
      );
    });

    test("generate an all day office365 link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const link = office365(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: String = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      expect(link).toBe(
        `https://outlook.office.com/calendar/0/deeplink/compose?enddt=${eTime}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&subject=Birthday%20party`.replace(
          /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/g,
          "$1-$2-$3T$4:$5:$6"
        )
      );
    });
  });

  describe("ICS", () => {
    test("should generate an all day ics link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: string = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });
    test("should generate an ics link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "day"],
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime: string = dayjs(event.start).add(2, "day").utc().format(TimeFormats.dateTimeUTC);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should generate an ics link with end date", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-23",
        end: "2019-12-29",
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime: string = dayjs(event.end).utc().format(TimeFormats.dateTimeUTC);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should generate an ics link with escaped characters", () => {
      const event: CalendarEvent = {
        title: "!#$%&'()*+,/:;=?@[] — Birthday party",
        description: "!#$%&'()*+,/:;=?@[] — My birthday!",
        location: "!#$%&'()*+,/:;=?@[] — My birthday!",
        start: "2019-12-23",
        end: "2019-12-29",
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC);
      const eTime: string = dayjs(event.end).utc().format(TimeFormats.dateTimeUTC);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20Birthday%20party%0ADESCRIPTION:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20My%20birthday!%0ALOCATION:!%23%24%25%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D%20%E2%80%94%20My%20birthday!%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should generate an all day ics link with a custom URL", () => {
      const url = "https://example.com/birthday";
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
        url,
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: string = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${encodeURIComponent(
          url
        )}%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("allDay should take precedence over duration", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
        duration: [2, "day"],
      };
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay);
      const eTime: string = dayjs(event.start).add(1, "day").utc().format(TimeFormats.allDay);

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should place an alarm for an event before 1 day", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [1, "day"],
        reminder: [1, "day"],
      };

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20191229T050000Z%0ADTEND:20191230T050000Z%0ASUMMARY:Birthday%20party%0ABEGIN:VALARM%0ATRIGGER:PT1D%0AACTION:DISPLAY%0ADESCRIPTION:Birthday%20party%0AEND:VALARM%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should place an alarm for an event before 1 minute", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [1, "day"],
        reminder: [1, "minute"],
      };

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20191229T050000Z%0ADTEND:20191230T050000Z%0ASUMMARY:Birthday%20party%0ABEGIN:VALARM%0ATRIGGER:PT1M%0AACTION:DISPLAY%0ADESCRIPTION:Birthday%20party%0AEND:VALARM%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });

    test("should place an alarm for an event before 15 minute and repeat 2 times", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [1, "day"],
        reminder: [15, "minute", 2],
      };

      const link = ics(event);
      expect(link).toBe(
        `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20191229T050000Z%0ADTEND:20191230T050000Z%0ASUMMARY:Birthday%20party%0ABEGIN:VALARM%0ATRIGGER:PT15M%0AREPEAT:2%0AACTION:DISPLAY%0ADESCRIPTION:Birthday%20party%0AEND:VALARM%0AEND:VEVENT%0AEND:VCALENDAR%0A`
      );
    });
  });
});
