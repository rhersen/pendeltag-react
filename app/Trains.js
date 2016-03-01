import React from 'react';

function Time(props) {
  return <td>{getData(props.data.AdvertisedTimeAtLocation)}</td>

  function getData(s) {
    return s && s.substr(11, 5)
  }
}

function Location(props) {
  return <td>{getData(props.data.ToLocation)}</td>

  function getData(a) {
    return a && a[0].LocationName
  }
}

function Train(props) {
  return <tr>
    <Time data={props.data}/>
    <Location data={props.data}/>
  </tr>
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
