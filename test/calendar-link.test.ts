import CalendarLink from '../src/calendar-link'
describe('Google test', () => {
  it('CalendarLink is instantiable', () => {
    expect(new CalendarLink()).toBeInstanceOf(CalendarLink)
  })
  it('Google is a function', () => {
    expect(new CalendarLink().google).toBeInstanceOf(Function)
  })
  it('Google returns correct URL', () => {
    expect(
      new CalendarLink().google({
        start: '2018-01-01',
        title: 'Hello world',
        duration: [2, 'hours']
      })
    ).toEqual('Function')
  })
})
