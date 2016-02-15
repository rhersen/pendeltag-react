const React = require('react')
const _ = require('lodash')
const request = require('then-request');

const StationLink = require('./StationLink')

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
    stationClicked: function (location) {
        return function () {
            console.log(location)
            request('GET', 'api/departures/' + location).done(function (res) {
                const message = JSON.parse(res.getBody());
                console.log('got', message.RESPONSE.RESULT[0].TrainAnnouncement.length, 'trains');
            })
        }
    },
    render: function () {
        return <div id="navs">
            <nav className="pull-left">
                <StationLink location="Kän" onClick={this.stationClicked} name={this.state.stations.Kän}/>
                <StationLink location="Khä" onClick={this.stationClicked} name={this.state.stations.Khä}/>
                <StationLink location="Jkb" onClick={this.stationClicked} name={this.state.stations.Jkb}/>
                <StationLink location="Bkb" onClick={this.stationClicked} name={this.state.stations.Bkb}/>
                <StationLink location="Spå" onClick={this.stationClicked} name={this.state.stations.Spå}/>
            </nav>
            <nav className="pull-right">
                <StationLink location="Nvk" onClick={this.stationClicked} name={this.state.stations.Nvk}/>
                <StationLink location="Hgv" onClick={this.stationClicked} name={this.state.stations.Hgv}/>
                <StationLink location="Sol" onClick={this.stationClicked} name={this.state.stations.Sol}/>
                <StationLink location="Hel" onClick={this.stationClicked} name={this.state.stations.Hel}/>
                <StationLink location="Udl" onClick={this.stationClicked} name={this.state.stations.Udl}/>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sub" onClick={this.stationClicked} name={this.state.stations.Sub}/>
            </nav>
            <nav className="center">
                <StationLink location="Ke" onClick={this.stationClicked} name={this.state.stations.Ke}/>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="So" onClick={this.stationClicked} name={this.state.stations.So}/>
            </nav>
            <nav className="center wide">
                <StationLink location="Cst" onClick={this.stationClicked} name={this.state.stations.Cst}/>
                <StationLink location="Sst" onClick={this.stationClicked} name={this.state.stations.Sst}/>
                <StationLink location="Åbe" onClick={this.stationClicked} name={this.state.stations.Åbe}/>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sta" onClick={this.stationClicked} name={this.state.stations.Sta}/>
            </nav>
            <nav className="center">
                <StationLink location="Äs" onClick={this.stationClicked} name={this.state.stations.Äs}/>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="Fas" onClick={this.stationClicked} name={this.state.stations.Fas}/>
            </nav>
            <nav className="pull-left">
                <StationLink location="Hu" onClick={this.stationClicked} name={this.state.stations.Hu}/>
                <StationLink location="Flb" onClick={this.stationClicked} name={this.state.stations.Flb}/>
                <StationLink location="Tul" onClick={this.stationClicked} name={this.state.stations.Tul}/>
                <StationLink location="Tu" onClick={this.stationClicked} name={this.state.stations.Tu}/>
                <StationLink location="Rön" onClick={this.stationClicked} name={this.state.stations.Rön}/>
                <StationLink location="Öte" onClick={this.stationClicked} name={this.state.stations.Öte}/>
                <StationLink location="Söd" onClick={this.stationClicked} name={this.state.stations.Söd}/>
            </nav>
            <nav className="pull-right">
                <StationLink location="Tåd" onClick={this.stationClicked} name={this.state.stations.Tåd}/>
                <StationLink location="Skg" onClick={this.stationClicked} name={this.state.stations.Skg}/>
                <StationLink location="Hnd" onClick={this.stationClicked} name={this.state.stations.Hnd}/>
                <StationLink location="Jbo" onClick={this.stationClicked} name={this.state.stations.Jbo}/>
                <StationLink location="Vhe" onClick={this.stationClicked} name={this.state.stations.Vhe}/>
                <StationLink location="Kda" onClick={this.stationClicked} name={this.state.stations.Kda}/>
                <StationLink location="Ts" onClick={this.stationClicked} name={this.state.stations.Ts}/>
            </nav>
        </div>
    }
})
