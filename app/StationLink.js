import React from 'react'

class StationLink extends React.Component {
  render() {
    return <div onClick={this.props.onClick}>{this.props.name || this.props.key}</div>;
  }
}

module.exports = StationLink
