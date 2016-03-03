import React from 'react'

class StationLink extends React.Component {
  render() {
    const names = this.props.names || {};
    const found = names[this.props.location];
    const name = found || this.props.location;
    return <div className={classNames(this.props.location)} onClick={this.props.onClick}>{name}</div>;

    function classNames(location) {
      var i;

      const w350 = ['Spå', 'Sub', 'Ke', 'Cst', 'Sst', 'Åbe', 'Äs', 'Sta', 'Hu', 'Flb', 'Tul', 'Tu'];
      for (i = 0; i < w350.length; i++) {
        if (w350[i] === location) {
          return "w350";
        }
      }


      const w600 = ['Udl', 'So', 'Fas', 'Tåd', 'Skg', 'Hnd', 'Jbo'];
      for (i = 0; i < w600.length; i++) {
        if (w600[i] === location) {
          return "w600";
        }
      }
    }
  }
}

module.exports = StationLink
