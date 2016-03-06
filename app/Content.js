import React from 'react'

import Navs from './Navs'
import Trains from './Trains'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: {}, trains: []
    }
  }

  setStations(array) {
    const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'))
    this.setState({stations: object})
  }

  render() {
    return <div>
      <Navs stations={this.props.stations} names={this.state.stations}
            firstTrain={_.first(this.state.trains)}
            setTrains={(array) => this.setState({trains: array})}/>
      <Trains trains={_.filter(this.state.trains, isSouthbound)} stations={this.state.stations}/>
      <Trains trains={_.reject(this.state.trains, isSouthbound)} stations={this.state.stations}/>
    </div>

    function isSouthbound(train) {
      return train.AdvertisedTrainIdent % 2
    }
  }
}

module.exports = Content
