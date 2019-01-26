import CalendarLink from '../src/calendar-link'

describe('Outlook test', () => {
  it('CalendarLink is instantiable', () => {
    expect(new CalendarLink()).toBeInstanceOf(CalendarLink)
  })
  it('Outlook is a function', () => {
    expect(new CalendarLink().outlook).toBeInstanceOf(Function)
  })
  it('Outlook returns correct URL', () => {
    const outlookCalendarLink = new CalendarLink().outlook({
      start: '2018-01-01 UTC+0100',
      title: 'Hello world',
      duration: [2, 'hours']
    })
    const expectedLink: string =
      'https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=20180101T000000&enddt=20180101T000000&subject=Hello%20world'
    expect(outlookCalendarLink).toEqual(expectedLink)
  })
})
