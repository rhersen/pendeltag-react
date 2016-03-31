import React from 'react'

function Time(props) {
  if (props.field === 'Estimated') {
    const actual = getField('')
    return actual ? <td><b>{actual}</b></td> : <td><i>{getField(props.field)}</i></td>
  }

  return <td>{getField(props.field)}</td>

  function getField(field) {
    return getData(props.data[field + 'TimeAtLocation'])
  }

  function getData(s) {
    return s && s.substr(11, 5)
  }
}
Time.propTypes = {
  field: React.PropTypes.string
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
Location.propTypes = {
  data: React.PropTypes.object,
  stations: React.PropTypes.object
}

function Countdown(props) {
  const match = /T(\d\d):(\d\d):(\d\d)/.exec(props.data.EstimatedTimeAtLocation || props.data.AdvertisedTimeAtLocation)

  if (!props.now || !match)
    return <td>?</td>

  const diff = match[3] - props.now.getSeconds() +
    (match[2] - props.now.getMinutes()) * 60 +
    (match[1] - props.now.getHours()) * 60 * 60

  if (diff < 0)
    return <td className="countdown">-</td>

  return countdown((diff - diff % 60) / 60, diff % 60)

  function countdown(minutes, seconds) {
    return <td className="countdown">{minutes}:{_.padStart(seconds, 2, '0')}</td>
  }
}
Countdown.propTypes = {
  data: React.PropTypes.object,
  now: React.PropTypes.instanceOf(Date)
}

function Train(props) {
  return <tr>
    <Time data={props.data} field="Advertised"/>
    <Location data={props.data} stations={props.stations}/>
    <Time data={props.data} field="Estimated"/>
    <Countdown data={props.data} now={props.now}/>
  </tr>
}
Train.propTypes = {
  data: React.PropTypes.object,
  now: React.PropTypes.instanceOf(Date),
  stations: React.PropTypes.object
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
Trains.propTypes = {
  trains: React.PropTypes.array,
  now: React.PropTypes.instanceOf(Date),
  stations: React.PropTypes.object
}

module.exports = Trains
