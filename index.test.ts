import { google, yahoo, outlook } from "./index";

test("generate a google link", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191229T000000Z%2F20191229T020000Z"
  );
});

test("generate a google link with time & timezone", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29T12:00:00.000+01:00",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191229T110000Z%2F20191229T130000Z"
  );
});

test("generate an all day google link", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29",
    allDay: true
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191229%2F20191230"
  );
});

test("generate a multi day google link", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29",
    end: "2020-01-12",
    allDay: true
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191229%2F20200112"
  );
});

test("generate a google link with guests", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"],
    guests: ["hello@example.com", "another@example.com"]
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191229T000000Z%2F20191229T020000Z&add=hello%40example.com%2Canother%40example.com"
  );
});

test("generate a yahoo link", () => {
  const link = yahoo({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://calendar.yahoo.com/?v=60&title=Birthday%20party&st=20191229T000000Z&et=20191229T020000Z&desc=&in_loc="
  );
});

test("generate an all day yahoo link", () => {
  const link = yahoo({
    title: "Birthday party",
    start: "2019-12-29",
    allDay: true
  });
  expect(link).toBe(
    "https://calendar.yahoo.com/?v=60&title=Birthday%20party&st=20191229&et=20191230&desc=&in_loc="
  );
});

test("generate a outlook link", () => {
  const link = outlook({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=20191229T000000&enddt=20191229T020000&subject=Birthday%20party&body=&location="
  );
});

test("generate an all day outlook link", () => {
  const link = outlook({
    title: "Birthday party",
    start: "2019-12-29",
    allDay: true
  });
  expect(link).toBe(
    "https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=20191229&enddt=20191230&subject=Birthday%20party&body=&location="
  );
});
