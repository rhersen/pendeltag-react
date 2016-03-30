jest.dontMock('../Trains')

const React = require('react')
const TestUtils = require('react-addons-test-utils')
import _ from 'lodash'

const Trains = require('../Trains')

describe('Trains', () => {
  it('has no rows if there are no trains', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[]}/>)

    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr').length).toEqual(0)
  })

  it('does not crash on empty train', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[{}]}/>)

    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr').length).toEqual(0)
  })

  it('does not crash if train only has id', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={[{AdvertisedTrainIdent: '2345'}]}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[0].textContent).toEqual('')
    expect(row.children[1].textContent).toEqual('')
  })

  it('estimated', () => {
    const t = _.assign(train(), {'EstimatedTimeAtLocation': '2016-02-17T19:53:00'})
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ t ]} now={ now(19, 52, 30) }/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[0].textContent).toEqual('19:52')
    expect(row.children[1].textContent).toEqual('Mr')
    expect(row.children[2].textContent).toEqual('19:53')
    expect(row.children[3].textContent).toEqual('0:30')
  })

  it('departed', () => {
    const t = _.assign(train(), {'TimeAtLocation': '2016-02-17T19:54:00'})
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ t ]}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[2].textContent).toEqual('19:54')
  })

  it('estimated and departed', () => {
    const t = _.assign(train(), {
      'EstimatedTimeAtLocation': '2016-02-17T19:53:00', 'TimeAtLocation': '2016-02-17T19:54:00'
    })

    const table = TestUtils.renderIntoDocument(<Trains trains={ [ t ]}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[2].textContent).toEqual('19:54')
    expect(row.children[2].querySelector('b').textContent).toEqual('19:54')
  })

  it('not estimated', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]} now={ now(19, 50, 30) }/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[3].textContent).toEqual('1:30')
  })

  it('pads seconds', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]} now={ now(19, 50, 51) }/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[3].textContent).toEqual('1:09')
  })

  it('hour wrap', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]} now={ now(18, 59, 51) }/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[3].textContent).toEqual('52:09')
  })

  it('does not show negative time', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]} now={ now(19, 52, 10) }/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[3].textContent).toEqual('-')
  })

  it('shows destination name if in stations', () => {
    const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]}
                                                       stations={ {Mr: 'Marsta'}}/>)

    const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
    expect(row.children[1].textContent).toEqual('Marsta')
  })

  function train() {
    return {
      'ActivityType': 'Avgang',
      'AdvertisedTimeAtLocation': '2016-02-17T19:52:00',
      'AdvertisedTrainIdent': '2762',
      'LocationSignature': 'Tul',
      'ProductInformation': ['Pendeltåg', '36'],
      'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
    }
  }

  function now(h, m, s) {
    const date = new Date()
    date.setHours(h, m, s)
    return date
  }
})