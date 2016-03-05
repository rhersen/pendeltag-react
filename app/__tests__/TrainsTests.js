jest.dontMock('../Trains')

const React = require('react')
const TestUtils = require('react-addons-test-utils')

const Trains = require('../Trains')

describe('Trains', () => {
  it('has no rows if there are no trains', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[]}/>)

    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr').length).toEqual(0)
  })

  it("don't crash on empty train", () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[{}]}/>)

    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr').length).toEqual(0)
  })

  it("don't crash if train only has id", () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[{AdvertisedTrainIdent: '2345'}]}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[0].textContent).toEqual('')
    expect(row.children[1].textContent).toEqual('')
  })

  it('one train', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[0].textContent).toEqual('19:52')
    expect(row.children[1].textContent).toEqual('Mr')
    expect(row.children[2].textContent).toEqual('19:53')
    expect(row.children[3].textContent).toEqual('19:54')
  })

  it('shows destination name if in stations', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]}
                                                       stations={ {Mr: 'Marsta'}}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[1].textContent).toEqual('Marsta')
  })

  function train() {
    return {
      "ActivityType": "Avgang",
      "AdvertisedTimeAtLocation": "2016-02-17T19:52:00",
      "EstimatedTimeAtLocation": "2016-02-17T19:53:00",
      "AdvertisedTrainIdent": "2762",
      "LocationSignature": "Tul",
      "ProductInformation": ["Pendeltåg", "36"],
      "ToLocation": [{"LocationName": "Mr", "Priority": 1, "Order": 0}],
      "TimeAtLocation": "2016-02-17T19:54:00"
    }
  }
})