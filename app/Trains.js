const React = require('react')

const Time = React.createClass({
    render: function () {
        return <td>{this.getData()}</td>
    },
    getData: function () {
        const s = this.props.data.AdvertisedTimeAtLocation;
        return s && s.substr(11, 5)
    }
})

const Location = React.createClass({
    render: function () {
        return <td>{this.getData()}</td>
    },
    getData: function () {
        const a = this.props.data.ToLocation;
        return a && a[0].LocationName
    }
})

const Train = React.createClass({
    render: function () {
        return (
            <tr>
                <Time data={this.props.data}/>
                <Location data={this.props.data}/>
            </tr>
        )
    }
})

module.exports = React.createClass({
    render: function () {
        return (
            <table>
                <tbody>
                {this.props.trains.filter(train => train.AdvertisedTrainIdent).map(this.train)}
                </tbody>
            </table>
        )
    },
    train: function (data) {
        return <Train data={data} key={data.AdvertisedTrainIdent}/>
    }
})
