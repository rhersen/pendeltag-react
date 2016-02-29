import React from 'react';

function Time(props) {
  return <td>{getData()}</td>

  function getData() {
    const s = props.data.AdvertisedTimeAtLocation;
    return s && s.substr(11, 5)
  }
}

function Location(props) {
  return <td>{getData()}</td>

  function getData() {
    const a = props.data.ToLocation;
    return a && a[0].LocationName
  }
}

function Train(props) {
  return <tr>
    <Time data={props.data}/>
    <Location data={props.data}/>
  </tr>
}

export default function Trains(props) {
  return (
    <table>
      <tbody>
      {
        props.trains
          .filter(train => train.AdvertisedTrainIdent)
          .map(data => <Train data={data} key={data.AdvertisedTrainIdent}/>)
      }
      </tbody>
    </table>
  )
}

