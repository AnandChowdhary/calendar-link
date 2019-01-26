import * as dayjs from 'dayjs'
import objectToQuery from 'object-to-querystring'

interface CalendarEvent {
  title: string
  start: any
  end?: any
  duration?: (string | number)[]
  description?: string
  location?: string
  busy?: boolean
  guests?: string[]
}

interface GoogleLink {
  action: string
  text: string
  dates: string
  details?: string
  location?: string
  trp?: boolean
  sprop?: string
  add?: string
  src?: string
  recur?: string
}

interface OutlookLink {
  path: string
  rru: string
  startdt: string
  enddt: string
  subject: string
  allday?: boolean
  body?: string
  location?: string
}

interface YahooLink {
  v: number
  title: string
  st: string
  et: string
  desc?: string
  in_loc?: string
}

function sanitizeEvent(event: CalendarEvent) {
  event.start = dayjs(event.start).toDate()
  if (event.duration && event.duration.length && !event.end) {
    const duration: number = +event.duration[0]
    const unit: dayjs.UnitType = event.duration[0] as dayjs.UnitType
    event.end = dayjs(event.start)
      .add(duration, unit)
      .toDate()
  }
  return event
}

export default class CalendarLink {
  google(event: CalendarEvent) {
    event = sanitizeEvent(event)
    const startDate: string = dayjs(event.start)
      .toISOString()
      .replace(/-/g, '')
      .replace(/:/g, '')
      .replace(/\./g, '')
    const endDate: string = dayjs(event.end)
      .toISOString()
      .replace(/-/g, '')
      .replace(/:/g, '')
      .replace(/\./g, '')
    const details: GoogleLink = {
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      trp: event.busy,
      dates:
        startDate.substring(0, startDate.length - 4) +
        'Z/' +
        endDate.substring(0, endDate.length - 4) +
        'Z'
    }
    if (event.guests && event.guests.length) {
      details.add = event.guests.join()
    }
    return 'https://calendar.google.com/calendar/render' + objectToQuery(details)
  }

  outlook(event: CalendarEvent) {
    event = sanitizeEvent(event)
    const details: OutlookLink = {
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: dayjs(event.start).format('YYYYMMDD[T]HHmmss'),
      enddt: dayjs(event.end).format('YYYYMMDD[T]HHmmss'),
      subject: event.title,
      body: event.description,
      location: event.location
    }
    return 'https://outlook.live.com/owa/' + objectToQuery(details)
  }

  yahoo(event: CalendarEvent) {
    event = sanitizeEvent(event)
    const details: YahooLink = {
      v: 60,
      title: event.title,
      st: dayjs(event.start).format('YYYYMMDD[T]HHmmss'),
      et: dayjs(event.end).format('YYYYMMDD[T]HHmmss'),
      desc: event.description,
      in_loc: event.location
    }
    return 'https://calendar.yahoo.com/' + objectToQuery(details)
  }
}
