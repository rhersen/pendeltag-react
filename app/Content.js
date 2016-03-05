import React from 'react'

import Navs from './Navs'
import Trains from './Trains'

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: {}, trains: []
    };
  }

  setStations(array) {
    const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'))
    this.setState({stations: object})
  }

  render() {
    return <div>
      <Navs stations={this.props.stations} names={this.state.stations} show={this.state.trains.length < 1}
            setTrains={(array) => this.setState({trains: array})}/>
      <Trains trains={this.state.trains} stations={this.state.stations}/>
    </div>
  }
}

module.exports = Content
