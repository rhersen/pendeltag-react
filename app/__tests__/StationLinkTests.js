jest.dontMock('../StationLink')

const React = require('react')
const TestUtils = require('react-addons-test-utils')

const StationLink = require('../StationLink')

describe('StationLink', () => {
  it('has name as text', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink name="Tullinge"/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.textContent).toEqual('Tullinge')
  })

  it('has key as text if no name', () => {
    const subject = TestUtils.renderIntoDocument(<StationLink location="Tul"/>)
    const result = TestUtils.findRenderedDOMComponentWithTag(subject, 'div');
    expect(result.textContent).toEqual('Tul')
  })
})