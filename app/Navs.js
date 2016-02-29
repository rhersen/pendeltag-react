const React = require('react')
const _ = require('lodash')
const request = require('then-request')

function StationLink(props) {
  return <div onClick={props.onClick}>{props.name || props.key}</div>;
}

export default function Navs(props) {
  const stationLink = (station) => {
    const handleDepartures = (res) => {
      const message = JSON.parse(res.getBody())
      const trainAnnouncement = message.RESPONSE.RESULT[0].TrainAnnouncement
      props.setTrains(trainAnnouncement)
    }
    return <StationLink
      onClick={ () => { request('GET', 'api/departures/' + station).done(handleDepartures) } }
      name={props.names[station]}
      key={station}/>
  }

  if (props.show) return <div id="navs">
    <nav className="pull-left">{props.stations.nw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.ne.map(stationLink)}</nav>
    <nav className="center wide">{props.stations.c.map(stationLink)}</nav>
    <nav className="pull-left">{props.stations.sw.map(stationLink)}</nav>
    <nav className="pull-right">{props.stations.se.map(stationLink)}</nav>
  </div>
  return <div id="navs" onClick={() => props.setTrains([])}>Tillbaka</div>
}
