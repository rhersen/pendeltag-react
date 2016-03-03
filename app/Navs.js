import React from 'react'
import _ from 'lodash'
import ajax from 'then-request'

import StationLink from './StationLink'

function Navs(props) {
  if (props.show) return <div id="navs">
    <nav className="pull-left">{props.stations.nw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.ne.map(stationLink)}</nav>
    <nav className="center wide">{props.stations.c.map(stationLink)}</nav>
    <nav className="pull-left">{props.stations.sw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.se.map(stationLink)}</nav>
  </div>

  return <div id="navs" onClick={() => props.setTrains([])}>Tillbaka</div>

  function stationLink(station) {
    return <StationLink
      onClick={ () => ajax('GET', 'api/departures/' + station).done(handleDepartures) }
      names={props.names}
      location={station}
      key={station}/>
  }

  function handleDepartures(res) {
    const message = JSON.parse(res.getBody())
    const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
    props.setTrains(trainAnnouncement)
  }
}

module.exports = Navs
