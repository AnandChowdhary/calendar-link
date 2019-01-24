interface CalendarEvent {
  start: Date
  end?: Date
  duration?: number
  title: string
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
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    return `${baseUrl}`
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
