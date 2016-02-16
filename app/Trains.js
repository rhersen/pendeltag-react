const React = require('react')

const Time = React.createClass({
    render: function () {
        return (
            <td>
                {this.stripDate()}
            </td>
        )
    },
    stripDate: function () {
        return this.props.data.AdvertisedTimeAtLocation.substr(11, 5)
    }
})

const Train = React.createClass({
    render: function () {
        return (
            <tr>
                <Time data={this.props.data}/>
                <td>{this.props.data.ToLocation[0].LocationName}</td>
            </tr>
        )
    }
})

module.exports = React.createClass({
    render: function () {
        return (
            <table>
                <tbody>
                {this.props.trains.map(this.train)}
                </tbody>
            </table>
        )
    },
    train: function (data) {
        return <Train data={data} key={data.AdvertisedTrainIdent}/>
    }
})
