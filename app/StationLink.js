import React from 'react'

class StationLink extends React.Component {
  render() {
    const names = this.props.names || {};
    const found = names[this.props.location];
    const name = found || this.props.location;

    return <div className={this.props.className} onClick={this.props.onClick}>{name}</div>;
  }
}

module.exports = StationLink
