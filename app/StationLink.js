import React from 'react';

export default class StationLink extends React.Component {
  render() {
    return <div onClick={this.props.onClick}>{this.props.name || this.props.key}</div>
  }
}
