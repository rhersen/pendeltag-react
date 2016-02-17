const React = require('react')
const _ = require('lodash')
const request = require('then-request')

const StationLink = require('./StationLink')

module.exports = React.createClass({
    stationLink: function (station) {
        const handleDepartures = (res) => {
            const message = JSON.parse(res.getBody())
            const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
            this.props.setTrains(trainAnnouncement)
        }
        return <StationLink
            onClick={ () => { request('GET', 'api/departures/' + station).done(handleDepartures) } }
            name={this.props.names[station]}
            key={station}/>
    },

    render: function () {
        if (this.props.show) return (
            <div id="navs">
                <nav className="pull-left">{this.props.stations.nw.map(this.stationLink)}</nav>
                <nav className="pull-right">{this.props.stations.ne.map(this.stationLink)}</nav>
                <nav className="center wide">{this.props.stations.c.map(this.stationLink)}</nav>
                <nav className="pull-left">{this.props.stations.sw.map(this.stationLink)}</nav>
                <nav className="pull-right">{this.props.stations.se.map(this.stationLink)}</nav>
            </div>
        )
        else return <div id="navs" onClick={()=>{this.props.setTrains([])}}>Tillbaka</div>
    }
})
