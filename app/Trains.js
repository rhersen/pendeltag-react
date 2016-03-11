import React from 'react'

function Time(props) {
  if (props.field === 'Estimated') {
    return <td>{getField(props.field)}/{getField('')}</td>
  } else {
    return <td>{getField(props.field)}</td>
  }

  function getField(field) {
    return getData(props.data[field + 'TimeAtLocation'])
  }

  function getData(s) {
    return s && s.substr(11, 5)
  }
}

function Location(props) {
  return <td>{getData(props.data.ToLocation)}</td>

  function getData(a) {
    if (a) {
      const key = a[0].LocationName
      return props.stations && props.stations[key] || key
    }
  }
}

function Countdown(props) {
  const exec = /T(\d\d):(\d\d):(\d\d)/.exec(props.data.EstimatedTimeAtLocation || props.data.AdvertisedTimeAtLocation)
  if (props.now && exec) {
    const hours = exec[1] - props.now.getHours()
    const seconds = exec[3] - props.now.getSeconds()
    var minutes = exec[2] - props.now.getMinutes() + hours * 60

    if (minutes < 1)
      return <td className="countdown">-</td>

    return <td className="countdown">{minutes - 1}:{_.padStart(seconds + 60, 2, '0')}</td>
  }

  return <td>?</td>
}

function Train(props) {
  return <tr>
    <Time data={props.data} field="Advertised"/>
    <Location data={props.data} stations={props.stations}/>
    <Time data={props.data} field="Estimated"/>
    <Countdown data={props.data} now={props.now}/>
  </tr>
}

class Trains extends React.Component {
  render() {
    return <table>
      <tbody>
      {this.props.trains
        .filter(train => train.AdvertisedTrainIdent)
        .map(data => <Train data={data}
                            key={data.AdvertisedTrainIdent}
                            stations={this.props.stations}
                            now={this.props.now}/>)}
      </tbody>
    </table>
  }
}

module.exports = Trains
