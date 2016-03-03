import React from 'react'

class StationLink extends React.Component {
  render() {
    const names = this.props.names || {};
    const found = names[this.props.location];
    const name = found || this.props.location;
    return <div className={classNames(this.props.location)} onClick={this.props.onClick}>{name}</div>;

    function classNames(location) {
      const locations = ['Spå', 'Sub', 'Ke', 'Cst', 'Sst', 'Åbe', 'Äs', 'Sta', 'Hu', 'Flb', 'Tul', 'Tu'];
      for (var i = 0; i < locations.length; i++) {
        var obj = locations[i];
        if (obj === location) {
          return "w350";
        }
      }
    }
  }
}

module.exports = StationLink
