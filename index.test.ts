import dayjs from "dayjs";

import { google, yahoo, outlook, ics } from "./index";
import { TimeFormats } from "./utils";
import { CalendarEvent } from "./interfaces";

describe('Calendar Links', () => {
  describe('Google', () => {
    test("generate a google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"]
      }
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC)
      const eTime = dayjs(event.start).add(2, 'hour').utc().format(TimeFormats.dateTimeUTC)
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`)
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=${expectedDates}`
      );
    });

    test("generate a google link with time & timezone", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29T12:00:00.000+01:00",
        duration: [2, "hour"]
      }
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC)
      const eTime = dayjs(event.start).add(2, 'hour').utc().format(TimeFormats.dateTimeUTC)
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`)
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=${expectedDates}`
      );
    });

    test("generate an all day google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true
      }
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime = dayjs(event.start).add(1, 'day').utc().format(TimeFormats.allDay)
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`)
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=${expectedDates}`
      );
    });

    test("generate a multi day google link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        end: "2020-01-12",
        allDay: true
      }
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime = dayjs(event.end).utc().format(TimeFormats.allDay)
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`)
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=${expectedDates}`
      );
    });

    test("generate a google link with guests", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        guests: ["hello@example.com", "another@example.com"]
      }
      const link = google(event);
      const sTime = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC)
      const eTime = dayjs(event.start).add(2, 'hour').utc().format(TimeFormats.dateTimeUTC)
      const expectedDates = encodeURIComponent(`${sTime}/${eTime}`)
      const expectedGuests = encodeURIComponent(event.guests ? event.guests.join() : '')
      expect(link).toBe(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=${expectedDates}&add=${expectedGuests}`
      );
    });
  });
  describe('Yahoo', () => {
    test("generate a yahoo link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"]
      }
      const link = yahoo(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.dateTimeUTC)
      const eTime: String = dayjs(event.start).add(2, 'hour').utc().format(TimeFormats.dateTimeUTC)

      expect(link).toBe(
        `https://calendar.yahoo.com/?v=60&title=Birthday%20party&st=${sTime}&et=${eTime}&desc=&in_loc=`
      );
    });

    test("generate an all day yahoo link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true
      }
      const link = yahoo(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime: String = dayjs(event.start).add(1, 'day').utc().format(TimeFormats.allDay)

      expect(link).toBe(
        `https://calendar.yahoo.com/?v=60&title=Birthday%20party&st=${sTime}&et=${eTime}&desc=&in_loc=`
      );
    });
  });
  describe('Outlook', () => {
    test("generate a outlook link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"]
      }
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.dateTime)
      const eTime: String = dayjs(event.start).add(2, 'hour').utc().format(TimeFormats.dateTime)
      const link = outlook(event);

      expect(link).toBe(
        `https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&enddt=${eTime}&subject=Birthday%20party&body=&location=`
      );
    });

    test("generate an all day outlook link", () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true
      }
      const link = outlook(event);
      const sTime: String = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime: String = dayjs(event.start).add(1, 'day').utc().format(TimeFormats.allDay)

      expect(link).toBe(
        `https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${sTime}&enddt=${eTime}&subject=Birthday%20party&body=&location=`
      );
    });
  });
  
  describe('ICS', () => {
    test('should generate an all day ics link', () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true
      }
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime: string = dayjs(event.start).add(1, 'day').utc().format(TimeFormats.allDay)

      const link = ics(event)
      expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${document.URL}%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0ADESCRIPTION:%0ALOCATION:undefined%0AEND:VEVENT%0AEND:VCALENDAR`)
    })
    test('should generate an ics link', () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "day"]
      }
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime: string = dayjs(event.start).add(2, 'day').utc().format(TimeFormats.allDay)

      const link = ics(event)
      expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${document.URL}%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0ADESCRIPTION:%0ALOCATION:undefined%0AEND:VEVENT%0AEND:VCALENDAR`)
    })
    
    test('should generate an ics link with end date', () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-23",
        end: "2019-12-29"
      }
      const sTime: string = dayjs(event.start).utc().format(TimeFormats.allDay)
      const eTime: string = dayjs(event.end).utc().format(TimeFormats.allDay)

      const link = ics(event)
      expect(link).toBe(`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:${document.URL}%0ADTSTART:${sTime}%0ADTEND:${eTime}%0ASUMMARY:Birthday%20party%0ADESCRIPTION:%0ALOCATION:undefined%0AEND:VEVENT%0AEND:VCALENDAR`)
    })
  })
})