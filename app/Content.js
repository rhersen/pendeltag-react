const React = require('react')

const Navs = require('./Navs')
const Trains = require('./Trains')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            stations: {},
            trains: []
        }
    },
    setStations: function (array) {
        const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'))
        this.setState({stations: object})
    },
    setTrains: function (array) {
        this.setState({trains: array})
    },
    render: function () {
        return (
            <div>
                <Navs stations={this.props.stations} names={this.state.stations} show={this.state.trains.length < 1} setTrains={this.setTrains} />
                <Trains trains={this.state.trains} />
            </div>
        )
    }
})
