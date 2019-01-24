import objectToQuery from 'object-to-querystring'

interface CalendarEvent {
  title: string
  start: Date
  end?: Date
  duration?: number
  description?: string
  location?: string
  busy?: boolean
  guests?: string[]
}

interface GoogleLink {
  action?: string
  text?: string
  dates?: string
  details?: string
  location?: string
  trp?: boolean
  sprop?: string
  add?: string
  src?: string
  recur?: string
}

function sanitizeEvent(event: CalendarEvent) {
  if (event.duration && !event.end) {
    event.end = new Date()
  }
  return event
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
      dates: '20201231T193000Z/20201231T223000Z'
    }
    if (event.guests && event.guests.length) {
      details.add = event.guests.join()
    }
    return 'https://calendar.google.com/calendar/render' + objectToQuery(details)
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
