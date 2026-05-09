import {
  aol,
  google,
  ics,
  msTeams,
  office365,
  office365Mobile,
  outlook,
  outlookMobile,
  yahoo,
} from "./index";
import { CalendarEvent } from "./interfaces";

describe("all-day events", () => {
  test("ics date-only events are timezone-stable", () => {
    const link = ics({ title: "Dec 29", start: "2025-12-29", allDay: true });

    expect(decodeURIComponent(link)).toContain("DTSTART:20251229");
    expect(decodeURIComponent(link)).toContain("DTEND:20251230");
  });
});

for (const service of [
  aol,
  google,
  ics,
  msTeams,
  office365,
  office365Mobile,
  outlook,
  outlookMobile,
  yahoo,
]) {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2019-12-28T12:00:00.000Z"));

    jest.spyOn(Math, "random").mockReturnValue(0.12345);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe(`${service.name} service`, () => {
    test(`generate a ${service.name} link`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a ${service.name} link with description`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        description: "Bring gifts!",
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a ${service.name} link with time & timezone`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29T12:00:00.000+01:00",
        duration: [2, "hour"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate an all day ${service.name} link`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
        status: "CONFIRMED",
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a multi day ${service.name} link`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        end: "2020-01-12",
        allDay: true,
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a recurring ${service.name} link`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        rRule: "FREQ=YEARLY;INTERVAL=1",
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a ${service.name} link with guests`, () => {
      const event: CalendarEvent = {
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        guests: ["hello@example.com", "another@example.com"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    if (service.name === ics.name) {
      test(`generate a ${service.name} link with uid`, () => {
        const event: CalendarEvent = {
          title: "Birthday party",
          start: "2019-12-29",
          duration: [2, "hour"],
          uid: 'abc_123'
        };
        const link = service(event);
        expect(link).toMatchSnapshot();
      });
    }
  });
}
