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

const uid = '4e23f079-6835-4ce0-a6dd-6efda61c165f'

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
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2019-12-28T12:00:00.000Z"));

    jest.spyOn(global.Math, "random").mockReturnValue(0.12345);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe(`${service.name} service`, () => {
    test(`generate a ${service.name} link`, () => {
      const event: CalendarEvent = {
        uid,
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a ${service.name} link with description`, () => {
      const event: CalendarEvent = {
        uid,
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
        uid,
        title: "Birthday party",
        start: "2019-12-29T12:00:00.000+01:00",
        duration: [2, "hour"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate an all day ${service.name} link`, () => {
      const event: CalendarEvent = {
        uid,
        title: "Birthday party",
        start: "2019-12-29",
        allDay: true,
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });

    test(`generate a multi day ${service.name} link`, () => {
      const event: CalendarEvent = {
        uid,
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
        uid,
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
        uid,
        title: "Birthday party",
        start: "2019-12-29",
        duration: [2, "hour"],
        guests: ["hello@example.com", "another@example.com"],
      };
      const link = service(event);
      expect(link).toMatchSnapshot();
    });
  });
}
