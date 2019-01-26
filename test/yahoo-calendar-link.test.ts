import CalendarLink from '../src/calendar-link'

describe('Yahoo test', () => {
  it('CalendarLink is instantiable', () => {
    expect(new CalendarLink()).toBeInstanceOf(CalendarLink)
  })
  it('Yahoo is a function', () => {
    expect(new CalendarLink().yahoo).toBeInstanceOf(Function)
  })
  it('Yahoo returns correct URL', () => {
    const yahooCalendarLink = new CalendarLink().yahoo({
      start: '2018-01-01 UTC+0100',
      title: 'Hello world',
      duration: [2, 'hours']
    })
    const expectedLink: string =
      'https://calendar.yahoo.com/?v=60&title=Hello%20world&st=20180101T000000&et=20180101T000000'
    expect(yahooCalendarLink).toEqual(expectedLink)
  })
})
