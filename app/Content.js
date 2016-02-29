const React = require('react')

import Navs from './Navs'
import Trains from './Trains'

export default class Content extends React.Component {
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

  setTrains(array) {
    this.setState({trains: array})
  }

  render() {
    return <div>
      <Navs stations={this.props.stations} names={this.state.stations} show={this.state.trains.length < 1}
            setTrains={this.setTrains.bind(this)}/>
      <Trains trains={this.state.trains}/>
    </div>
  }
}
