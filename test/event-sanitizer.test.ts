import CalendarLink from '../src/calendar-link'

describe('Google test', () => {
  it('Google event with end', () => {
    const googleCalendarLink = new CalendarLink().google({
      start: '2018-01-01',
      end: '2018-01-02',
      title: 'Hello world'
    })
    const expectedLink: string =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hello%20world&dates=20171231T230000Z%2F20180101T230000Z'
    expect(googleCalendarLink).toEqual(expectedLink)
  })
  it('Google event with duration', () => {
    const googleCalendarLink = new CalendarLink().google({
      start: '2018-01-01',
      title: 'Hello world',
      duration: [2, 'hours']
    })
    const expectedLink: string =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hello%20world&dates=20171231T230000Z%2F20171231T230000Z'
    expect(googleCalendarLink).toEqual(expectedLink)
  })
  it('Google event with duration and end', () => {
    const googleCalendarLink = new CalendarLink().google({
      start: '2018-01-01',
      end: '2018-01-02',
      title: 'Hello world',
      duration: [2, 'hours']
    })
    const expectedLink: string =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Hello%20world&dates=20171231T230000Z%2F20180101T230000Z'
    expect(googleCalendarLink).toEqual(expectedLink)
  })
})
