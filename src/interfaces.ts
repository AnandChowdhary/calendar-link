import dayjs, { Dayjs } from "dayjs";

interface CalendarEvent {
  title: string;
  start: any;
  end?: any;
  duration?: [number, dayjs.UnitType];
  allDay?: boolean;
  description?: string;
  location?: string;
  busy?: boolean;
  guests?: string[];
  url?: string;
  reminder?:[number, dayjs.UnitType, number?];
}

interface ReminderAlarm {
    value : number;
    unit : string;
    when : dayjs.Dayjs;
    repeat?: number;
}

interface NormalizedCalendarEvent extends Omit<CalendarEvent, "start" | "end" | "duration" | "reminder"> {
  startUtc: dayjs.Dayjs;
  endUtc: dayjs.Dayjs;
  reminderAlarm? : ReminderAlarm
}

interface Google extends Record<string, string | boolean | number | undefined> {
  action: string;
  text: string;
  dates: string;
  details?: string;
  location?: string;
  trp?: boolean;
  sprop?: string;
  add?: string;
  src?: string;
  recur?: string;
}

interface Outlook extends Record<string, string | boolean | number | undefined> {
  path: string;
  rru: string;
  startdt: string;
  enddt: string;
  subject: string;
  allday?: boolean;
  body?: string;
  location?: string;
}

interface Yahoo extends Record<string, string | boolean | number | undefined> {
  v: number;
  title: string;
  st: string;
  et: string;
  desc?: string;
  in_loc?: string;
}

export { CalendarEvent, NormalizedCalendarEvent, Outlook, Yahoo, Google, ReminderAlarm };
