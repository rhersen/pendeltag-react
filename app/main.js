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
            secondsElapsed: 0,
            stations: []
        }
    },
    tick: function () {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1})
    },
    setStations: function (stations) {
        this.setState({stations: stations})
    },
    componentDidMount: function () {
        this.interval = setInterval(this.tick, 1000)
    },
    componentWillUnmount: function () {
        clearInterval(this.interval)
    },
    render: function () {
        return <div id="navs">
            <nav className="pull-left">
                <StationLink location="Kän">Kän</StationLink>
                <StationLink location="Khä">Khä</StationLink>
                <StationLink location="Jkb">Jkb</StationLink>
                <StationLink location="Bkb">Bkb</StationLink>
                <StationLink location="Spå">Spå</StationLink>
            </nav>
            <nav className="pull-right">
                <StationLink location="Nvk">Nvk</StationLink>
                <StationLink location="Hgv">Hgv</StationLink>
                <StationLink location="Sol">Sol</StationLink>
                <StationLink location="Hel">Hel</StationLink>
                <StationLink location="Udl">Udl</StationLink>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sub">Sub</StationLink>
            </nav>
            <nav className="center">
                <StationLink location="Ke">Ke</StationLink>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="So">So</StationLink>
            </nav>
            <nav className="center wide">
                <StationLink location="Cst">Cst</StationLink>
                <StationLink location="Sst">Sst</StationLink>
                <StationLink location="Åbe">Åbe</StationLink>
            </nav>
            <nav className="pull-left narrow">
                <StationLink location="Sta">Sta</StationLink>
            </nav>
            <nav className="center">
                <StationLink location="Äs">Äs</StationLink>
            </nav>
            <nav className="pull-right narrow">
                <StationLink location="Fas">Fas</StationLink>
            </nav>
            <nav className="pull-left">
                <StationLink location="Hu">Hu</StationLink>
                <StationLink location="Flb">Flb</StationLink>
                <StationLink location="Tul">Tul</StationLink>
                <StationLink location="Tu">Tu</StationLink>
                <StationLink location="Rön">Rön</StationLink>
                <StationLink location="Öte">Öte</StationLink>
                <StationLink location="Söd">Söd</StationLink>
            </nav>
            <nav className="pull-right">
                <StationLink location="Tåd">Tåd</StationLink>
                <StationLink location="Skg">Skg</StationLink>
                <StationLink location="Hnd">Hnd</StationLink>
                <StationLink location="Jbo">Jbo</StationLink>
                <StationLink location="Vhe">Vhe</StationLink>
                <StationLink location="Kda">Kda</StationLink>
                <StationLink location="Ts">Ts</StationLink>
            </nav>
        </div>
    }
})

const navs = ReactDOM.render(<Navs />, document.getElementById('content'));

request('GET', 'api/stations').done(function (res) {
    const body = res.getBody();
    navs.setStations(JSON.parse(body).RESPONSE.RESULT[0].TrainStation);
});