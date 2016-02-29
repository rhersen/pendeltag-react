import React from 'react';

class Time extends React.Component {
  render() {
    return <td>{this.getData()}</td>
  }

  getData() {
    const s = this.props.data.AdvertisedTimeAtLocation;
    return s && s.substr(11, 5)
  }
}

class Location extends React.Component {
  render() {
    return <td>{this.getData()}</td>
  }

  getData() {
    const a = this.props.data.ToLocation;
    return a && a[0].LocationName
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

export default class Trains extends React.Component {
  render() {
    return (
      <table>
        <tbody>
        {
          this.props.trains
            .filter(train => train.AdvertisedTrainIdent)
            .map(data => <Train data={data} key={data.AdvertisedTrainIdent}/>)
        }
        </tbody>
      </table>
    )
  }
}

