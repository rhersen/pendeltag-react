import React from 'react';

function Time(props) {
  return <td>{getData(props.data[props.field + 'TimeAtLocation'])}</td>

  function getData(s) {
    return s && s.substr(11, 5)
  }
}

function Location(props) {
  return <td>{getData(props.data.ToLocation)}</td>

  function getData(a) {
    if (a) {
      const key = a[0].LocationName;
      return props.stations && props.stations[key] || key;
    }
  }
}

function Train(props) {
  return <tr>
    <Time data={props.data} field="Advertised"/>
    <Location data={props.data} stations={props.stations}/>
    <Time data={props.data} field="Estimated"/>
    <Time data={props.data} field=""/>
  </tr>
}

class Trains extends React.Component {
  render() {
    return <table>
      <tbody>
      {this.props.trains
        .filter(train => train.AdvertisedTrainIdent)
        .map(data => <Train data={data} key={data.AdvertisedTrainIdent} stations={this.props.stations}/>)}
      </tbody>
    </table>
  }
}

module.exports = Trains
