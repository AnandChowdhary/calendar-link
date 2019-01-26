import CalendarLink from '../src/calendar-link'

describe('Google test', () => {
  it('CalendarLink is instantiable', () => {
    expect(new CalendarLink()).toBeInstanceOf(CalendarLink)
  })
  it('Google is a function', () => {
    expect(new CalendarLink().google).toBeInstanceOf(Function)
  })
  it('Google returns correct URL', () => {
    const googleCalendarLink = new CalendarLink().google({
      start: '2018-01-01',
      title: 'Hello world',
      duration: [2, 'hours']
    })
    const expectedLink: string =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hello%20world&dates=20171231T230000Z%2F20171231T230000Z'
    expect(googleCalendarLink).toEqual(expectedLink)
  })
  it('Google returns correct URL for full featured (demo) event', () => {
    const googleCalendarLink = new CalendarLink().google({
      start: '2019-12-29',
      duration: [1, 'day'],
      title: 'Anand birthday',
      description: 'Get ready for the party of your life!',
      location: 'Internet',
      busy: true,
      guests: ['friend@example.com', 'coworker@oswaldlabs.com']
    })
    const expectedLink: string =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&' +
      'text=Anand%20birthday&details=Get%20ready%20for%20the%20party%20of%20your%20life!&' +
      'location=Internet&trp=true&dates=20191228T230000Z%2F20191228T230000Z&' +
      'add=friend%40example.com%2Ccoworker%40oswaldlabs.com'
    expect(googleCalendarLink).toEqual(expectedLink)
  })
})
