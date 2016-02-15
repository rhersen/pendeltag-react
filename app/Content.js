const React = require('react')

const Navs = require('./Navs')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            stations: {}
        }
    },
    setStations: function (array) {
        const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'))
        this.setState({stations: object})
    },
    render: function () {
        return <Navs stations={this.props.stations} names={this.state.stations} />
    }
})
