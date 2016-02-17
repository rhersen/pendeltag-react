const React = require('react')
const _ = require('lodash')
const request = require('then-request')

const StationLink = require('./StationLink')

module.exports = React.createClass({
    getClickHandler: function (station) {
        const p = this.props

        function handleClick() {
            return function () {
                request('GET', 'api/departures/' + station).done(function (res) {
                    const message = JSON.parse(res.getBody())
                    const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
                    p.setTrains(trainAnnouncement)
                })
            }
        }

        return <StationLink onClick={handleClick} name={this.props.names[station]} key={station}/>
    },

    render: function () {
        if (this.props.show) return (
            <div id="navs">
                <nav className="pull-left">{this.props.stations.nw.map(this.getClickHandler)}</nav>
                <nav className="pull-right">{this.props.stations.ne.map(this.getClickHandler)}</nav>
                <nav className="center wide">{this.props.stations.c.map(this.getClickHandler)}</nav>
                <nav className="pull-left">{this.props.stations.sw.map(this.getClickHandler)}</nav>
                <nav className="pull-right">{this.props.stations.se.map(this.getClickHandler)}</nav>
            </div>
        )
        else return <div>Tillbaka</div>
    }
})
