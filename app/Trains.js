const React = require('react')

const Train = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.data.AdvertisedTimeAtLocation}</td>
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
