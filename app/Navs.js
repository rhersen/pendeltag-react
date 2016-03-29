import React from 'react'
import _ from 'lodash'
import ajax from 'then-request'

import StationLink from './StationLink'

function Navs(props) {
  if (props.firstTrain) return <div>
    <span id="navs" onClick={() => props.setTrains([])}>&lt; </span>
    <span>{props.names && props.names[props.firstTrain.LocationSignature] || props.firstTrain.LocationSignature}</span>
  </div>

  return <div id="navs">
    <nav className="pull-left">{props.stations.nw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.ne.map(stationLink)}</nav>
    <nav className="center wide">{props.stations.c.map(stationLink)}</nav>
    <nav className="pull-left">{props.stations.sw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.se.map(stationLink)}</nav>
  </div>

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
      w768: w('Bål', 'Upv', 'Söc', 'Hfa'),
      w1024: w('Kän', 'Nvk', 'Tu', 'Jbo'),
      w1280: w('Bål', 'Upv', 'Gn', 'Nyh')
    })
      .pickBy(_.identity)
      .keys()
      .join(' ')

    function w(nw, ne, sw, se) {
      if (_.includes(props.stations.c, station))
        return true

      const found = _.find(
        [[nw, props.stations.nw, _.gte], [ne, props.stations.ne, _.gte],
          [sw, props.stations.sw, _.lte], [se, props.stations.se, _.lte]],
        a => a[0] && _.includes(a[1], station))

      if (found)
        return found[2](_.indexOf(found[1], station), _.indexOf(found[1], found[0]))
    }
  }

  function handleDepartures(res) {
    const message = JSON.parse(res.getBody())
    const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
    props.setTrains(trainAnnouncement)
  }
}
Navs.propTypes = {
  firstTrain: React.PropTypes.object,
  names: React.PropTypes.object,
  stations: React.PropTypes.object,
  setTrains: React.PropTypes.func
}

module.exports = Navs
