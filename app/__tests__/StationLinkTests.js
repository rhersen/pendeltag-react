jest.dontMock('../StationLink')

const React = require('react')
const TestUtils = require('react-addons-test-utils')

const StationLink = require('../StationLink')

describe('StationLink', () => {
  it('no names', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.textContent).toEqual('')
  })

  it('location found in names', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink location="Tul" names={{Tul:'Tullinge'}}/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.textContent).toEqual('Tullinge')
  })

  it('falls back to location if location not found in names', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink location="Tul"/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.textContent).toEqual('Tul')
  })

  it('shows Tullinge on mobile portrait', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink location="Tul"/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.classList.contains('w350')).toBeTruthy()
  })

  it('does not show Norrviken on mobile portrait', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink location="Nvk"/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.classList.contains('w350')).toBeFalsy()
  })
})