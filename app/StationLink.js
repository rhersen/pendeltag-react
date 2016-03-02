import React from 'react'

class StationLink extends React.Component {
  render() {
    return <div key={this.props.location} onClick={this.props.onClick}>{this.props.name || this.props.location}</div>;
  }
}

module.exports = StationLink
