jest.dontMock('../Trains')

const React = require('react')
const TestUtils = require('react-addons-test-utils')

const Trains = require('../Trains')

describe('Trains', () => {
    it('has no rows if there are no trains', () => {
        const table = TestUtils.renderIntoDocument(<Trains trains={[]}/>)

        expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr').length).toEqual(0)
    })

    it('one train', () => {
        const table = TestUtils.renderIntoDocument(<Trains trains={ [ train() ]}/>)

        const row = TestUtils.findRenderedDOMComponentWithTag(table, 'tr')
        expect(row.children[0].textContent).toEqual('19:52')
    })

    function train() {
        return {
            "ActivityType": "Avgang",
            "AdvertisedTimeAtLocation": "2016-02-17T19:52:00",
            "AdvertisedTrainIdent": "2762",
            "LocationSignature": "Tul",
            "ProductInformation": ["Pendeltåg", "36"],
            "ToLocation": [{"LocationName": "Mr", "Priority": 1, "Order": 0}],
            "TimeAtLocation": "2016-02-17T19:52:00"
        }
    }
})