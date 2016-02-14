const React = require('react')
const ReactDOM = require('react-dom')
const request = require('then-request');
require("./style.css");

const StationLink = React.createClass({
    render: function () {
        return <div>{this.props.location}</div>
    }
})

const Navs = React.createClass({
    getInitialState: function () {
        return {
            stations: []
        }
    },
    setStations: function (stations) {
        this.setState({stations: stations})
    },
    render: function () {
        return <div id="navs">
            <nav className="pull-left">
                <StationLink location="Kän" />
                <StationLink location="Khä" />
                <StationLink location="Jkb" />
                <StationLink location="Bkb" />
                <StationLink location="Spå" />
            </nav>
            <nav className="pull-right">
                <StationLink location="Nvk" />
                <StationLink location="Hgv" />
                <StationLink location="Sol" />
                <StationLink location="Hel" />
                <StationLink location="Udl" />
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sub" />
            </nav>
            <nav className="center">
                <StationLink location="Ke" />
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="So" />
            </nav>
            <nav className="center wide">
                <StationLink location="Cst" />
                <StationLink location="Sst" />
                <StationLink location="Åbe" />
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sta" />
            </nav>
            <nav className="center">
                <StationLink location="Äs" />
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="Fas" />
            </nav>
            <nav className="pull-left">
                <StationLink location="Hu" />
                <StationLink location="Flb" />
                <StationLink location="Tul" />
                <StationLink location="Tu" />
                <StationLink location="Rön" />
                <StationLink location="Öte" />
                <StationLink location="Söd" />
            </nav>
            <nav className="pull-right">
                <StationLink location="Tåd" />
                <StationLink location="Skg" />
                <StationLink location="Hnd" />
                <StationLink location="Jbo" />
                <StationLink location="Vhe" />
                <StationLink location="Kda" />
                <StationLink location="Ts" />
            </nav>
        </div>
    }
})

const navs = ReactDOM.render(<Navs />, document.getElementById('content'));

request('GET', 'api/stations').done(function (res) {
    const body = res.getBody();
    navs.setStations(JSON.parse(body).RESPONSE.RESULT[0].TrainStation);
});