const React = require('react')

const Navs = require('./Navs')

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
        console.log('setTrains', array);
        this.setState({trains: array})
    },
    render: function () {
        return <Navs stations={this.props.stations} names={this.state.stations} setTrains={this.setTrains}/>
    }
})
