const React = require('react')
const ReactDOM = require('react-dom')
const request = require('then-request');
const _ = require('lodash');
require("./style.css");

const StationLink = React.createClass({
    render: function () {
        return <div>{this.props.name || this.props.location}</div>
    }
})

const Navs = React.createClass({
    getInitialState: function () {
        return {
            stations: {}
        }
    },
    setStations: function (array) {
        const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'));
        this.setState({stations: object})
    },
    render: function () {
        return <div id="navs">
            <nav className="pull-left">
                <StationLink location="Kän" name={this.state.stations.Kän}/>
                <StationLink location="Khä" name={this.state.stations.Khä}/>
                <StationLink location="Jkb" name={this.state.stations.Jkb}/>
                <StationLink location="Bkb" name={this.state.stations.Bkb}/>
                <StationLink location="Spå" name={this.state.stations.Spå}/>
            </nav>
            <nav className="pull-right">
                <StationLink location="Nvk" name={this.state.stations.Nvk}/>
                <StationLink location="Hgv" name={this.state.stations.Hgv}/>
                <StationLink location="Sol" name={this.state.stations.Sol}/>
                <StationLink location="Hel" name={this.state.stations.Hel}/>
                <StationLink location="Udl" name={this.state.stations.Udl}/>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sub" name={this.state.stations.Sub}/>
            </nav>
            <nav className="center">
                <StationLink location="Ke" name={this.state.stations.Ke}/>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="So" name={this.state.stations.So}/>
            </nav>
            <nav className="center wide">
                <StationLink location="Cst" name={this.state.stations.Cst}/>
                <StationLink location="Sst" name={this.state.stations.Sst}/>
                <StationLink location="Åbe" name={this.state.stations.Åbe}/>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sta" name={this.state.stations.Sta}/>
            </nav>
            <nav className="center">
                <StationLink location="Äs" name={this.state.stations.Äs}/>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="Fas" name={this.state.stations.Fas}/>
            </nav>
            <nav className="pull-left">
                <StationLink location="Hu" name={this.state.stations.Hu}/>
                <StationLink location="Flb" name={this.state.stations.Flb}/>
                <StationLink location="Tul" name={this.state.stations.Tul}/>
                <StationLink location="Tu" name={this.state.stations.Tu}/>
                <StationLink location="Rön" name={this.state.stations.Rön}/>
                <StationLink location="Öte" name={this.state.stations.Öte}/>
                <StationLink location="Söd" name={this.state.stations.Söd}/>
            </nav>
            <nav className="pull-right">
                <StationLink location="Tåd" name={this.state.stations.Tåd}/>
                <StationLink location="Skg" name={this.state.stations.Skg}/>
                <StationLink location="Hnd" name={this.state.stations.Hnd}/>
                <StationLink location="Jbo" name={this.state.stations.Jbo}/>
                <StationLink location="Vhe" name={this.state.stations.Vhe}/>
                <StationLink location="Kda" name={this.state.stations.Kda}/>
                <StationLink location="Ts" name={this.state.stations.Ts}/>
            </nav>
        </div>
    }
})

const navs = ReactDOM.render(<Navs />, document.getElementById('content'));

request('GET', 'api/stations').done(function (res) {
    const body = res.getBody();
    navs.setStations(JSON.parse(body).RESPONSE.RESULT[0].TrainStation);
});