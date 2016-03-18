import React from 'react'

import Navs from './Navs'
import Trains from './Trains'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {stations: {}, trains: [], now: new Date()}
    this.interval = 0
  }

  setStations(array) {
    const object = _.zipObject(_.map(array, 'LocationSignature'), _.map(array, 'AdvertisedShortLocationName'))
    this.setState({stations: object})
  }

  render() {
    const setTrains = (array) => {
      if (_.isEmpty(array))
        clearTimeout(this.interval)
      else
        this.interval = setInterval(() => this.setState({now: new Date()}), 1000)

      this.setState({trains: array})
    }
    return <div>
      <Navs stations={this.props.stations} names={this.state.stations} firstTrain={_.first(this.state.trains)}
            setTrains={setTrains}/>
      <Trains trains={_.filter(this.state.trains, isSouthbound)} stations={this.state.stations} now={this.state.now}/>
      <Trains trains={_.reject(this.state.trains, isSouthbound)} stations={this.state.stations} now={this.state.now}/>
    </div>

    function isSouthbound(train) {
      return train.AdvertisedTrainIdent % 2
    }
  }
}
Content.propTypes = {
  stations: React.PropTypes.object
}

module.exports = Content
