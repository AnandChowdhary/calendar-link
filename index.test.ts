import { google } from "./index";

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
