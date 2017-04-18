import React from 'react'
import _ from 'lodash'
import ajax from 'then-request'

import StationLink from './StationLink'

function Navs(props) {
    if (props.firstTrain) return <div>
        <span id="navs" onClick={() => props.setTrains([])}>&lt; </span>
        <span>{
            props.names && props.names[props.firstTrain.LocationSignature] || props.firstTrain.LocationSignature
        }</span>
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
            onClick={
                () => ajax('GET', '/json/departures?since=0:15&until=0:59&locations=' + station).done(handleDepartures)
            }
            names={props.names}
            className={classNames(station)}
            location={station}
            key={station}/>
    }

    function classNames(station) {
        return _({
            w350: isInRange('Spå', undefined, 'Tu', undefined),
            w600: isInRange('Sub', 'So', 'Tu', 'Jbo'),
            w768: isInRange('Bål', 'Upv', 'Söc', 'Hfa'),
            w1024: isInRange('Kän', 'Nvk', 'Tu', 'Jbo'),
            w1280: isInRange('Bål', 'Upv', 'Gn', 'Nyh')
        })
            .pickBy(_.identity)
            .keys()
            .join(' ')

        function isInRange() {
            if (_.includes(props.stations.c, station))
                return true

            return _(props.stations)
                .reject((value, key) => key === 'c')
                .map(locations => ({locations}))
                .map((obj, i) => _.assign({end: arguments[i], cmp: i < 2 ? _.gte : _.lte}, obj))
                .filter('end')
                .filter(obj => _.includes(obj.locations, station))
                .some(obj => obj.cmp(_.indexOf(obj.locations, station), _.indexOf(obj.locations, obj.end)))
        }
    }

    function handleDepartures(res) {
        props.setTrains(JSON.parse(res.getBody()).RESPONSE.RESULT[0].TrainAnnouncement)
    }
}
Navs.propTypes = {
    firstTrain: React.PropTypes.object,
    names: React.PropTypes.object,
    stations: React.PropTypes.object,
    setTrains: React.PropTypes.func
}

module.exports = Navs
