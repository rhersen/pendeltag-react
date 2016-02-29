const React = require('react')
const _ = require('lodash')
const request = require('then-request')

import StationLink from './StationLink'

export default class Navs extends React.Component {
  render() {
    const stationLink = (station) => {
      const handleDepartures = (res) => {
        const message = JSON.parse(res.getBody())
        const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
        this.props.setTrains(trainAnnouncement)
      }
      return <StationLink
        onClick={ () => { request('GET', 'api/departures/' + station).done(handleDepartures) } }
        name={this.props.names[station]}
        key={station}/>
    }

    if (this.props.show) return <div id="navs">
      <nav className="pull-left">{this.props.stations.nw.map(stationLink)}</nav>
      <nav className="pull-right">{this.props.stations.ne.map(stationLink)}</nav>
      <nav className="center wide">{this.props.stations.c.map(stationLink)}</nav>
      <nav className="pull-left">{this.props.stations.sw.map(stationLink)}</nav>
      <nav className="pull-right">{this.props.stations.se.map(stationLink)}</nav>
    </div>
    return <div id="navs" onClick={()=>{this.props.setTrains([])}}>Tillbaka</div>
  }
}
