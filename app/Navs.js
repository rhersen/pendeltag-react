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
      className={classNames(station)}
      location={station}
      key={station}/>
  }

  function classNames(station) {
    return _({
      w350: w('Spå', undefined, 'Tu', undefined),
      w600: w('Sub', 'So', 'Tu', 'Jbo'),
      w768: w('Bål', 'Upv', 'Söu', 'Ssä'),
      w1024: w('Kän', 'Nvk', 'Rön', 'Vhe'),
      w1280: w('Bål', 'Upv', 'Gn', 'Nyh')
    })
      .pickBy(_.identity)
      .keys()
      .join(' ');

    function w(nw, ne, sw, se) {
      if (_.includes(props.stations.c, station))
        return true;

      if (nw && _.includes(props.stations.nw, station))
        return _.indexOf(props.stations.nw, station) >= _.indexOf(props.stations.nw, nw);

      if (ne && _.includes(props.stations.ne, station))
        return _.indexOf(props.stations.ne, station) >= _.indexOf(props.stations.ne, ne);

      if (sw && _.includes(props.stations.sw, station))
        return _.indexOf(props.stations.sw, station) <= _.indexOf(props.stations.sw, sw);

      if (se && _.includes(props.stations.se, station))
        return _.indexOf(props.stations.se, station) <= _.indexOf(props.stations.se, se);
    }
  }

  function handleDepartures(res) {
    const message = JSON.parse(res.getBody())
    const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
    props.setTrains(trainAnnouncement)
  }
}

module.exports = Navs
