import { google, yahoo, outlook } from "./index";

test("generate a google link", () => {
  const link = google({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191228T230000Z%2F20191229T010000Z"
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
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Birthday%20party&details=&location=&trp=&dates=20191228T230000Z%2F20191229T010000Z&add=hello%40example.com%2Canother%40example.com"
  );
});

test("generate a yahoo link", () => {
  const link = yahoo({
    title: "Birthday party",
    start: "2019-12-29",
    duration: [2, "hour"]
  });
  expect(link).toBe(
    "https://calendar.yahoo.com/?v=60&title=Birthday%20party&st=20191229T000000&et=20191229T020000&desc=&in_loc="
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
