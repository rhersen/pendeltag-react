const React = require('react')

class Time extends React.Component {
  render() {
    return <td>{getData(this.props.data.AdvertisedTimeAtLocation)}</td>

    function getData(s) {
      return s && s.substr(11, 5);
    }
  }
}

class Location extends React.Component {
  render() {
    return <td>{getData(this.props.data.ToLocation)}</td>

    function getData(a) {
      return a && a[0].LocationName;
    }
  }
}

class Train extends React.Component {
  render() {
    return <tr>
      <Time data={this.props.data}/>
      <Location data={this.props.data}/>
    </tr>
  }
}

class Trains extends React.Component {
  render() {
    return <table>
      <tbody>
      {this.props.trains.filter(train => train.AdvertisedTrainIdent).map(train)}
      </tbody>
    </table>

    function train(data) {
      return <Train data={data} key={data.AdvertisedTrainIdent}/>
    }
  }
}

module.exports = Trains
