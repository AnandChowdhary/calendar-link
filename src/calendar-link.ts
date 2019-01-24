import dayjs from 'dayjs'
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
  action?: string
  text?: string
  dates?: string // YYYYMMDDToHHmmSSZ/YYYYMMDDToHHmmSSZ
  details?: string
  location?: string
  trp?: boolean
  sprop?: string
  add?: string
  src?: string
  recur?: string
}

function sanitizeEvent(event: CalendarEvent) {
  event.start = dayjs(event.start).toDate()
  if (event.duration && event.duration.length && !event.end) {
    event.end = dayjs(event.start)
      .add(event.duration[0], event.duration[1])
      .toDate()
  }
  return event
}

function encodeAll(object: any) {
  for (let key in object) {
    // object[key] = encodeURIComponent(object[key]);
  }
  return object
}

export default class CalendarLink {
  constructor(event: CalendarEvent) {}

  google(event: CalendarEvent) {
    event = sanitizeEvent(event)
    const details: GoogleLink = {
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      trp: event.busy,
      dates:
        dayjs(event.start).format('YYYYMMDD') +
        'T' +
        dayjs(event.start).format('HHmmss') +
        'Z' +
        '/' +
        dayjs(event.end).format('YYYYMMDD') +
        'T' +
        dayjs(event.end).format('HHmmss') +
        'Z'
    }
    if (event.guests && event.guests.length) {
      details.add = event.guests.join()
    }
    return 'https://calendar.google.com/calendar/render' + objectToQuery(encodeAll(details))
  }

  yahoo(event: CalendarEvent) {
    event = sanitizeEvent(event)
    return JSON.stringify(event)
  }

  outlook(event: CalendarEvent) {
    event = sanitizeEvent(event)
    return JSON.stringify(event)
  }
}
