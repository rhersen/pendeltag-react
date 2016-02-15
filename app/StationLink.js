const React = require('react')

module.exports = React.createClass({
    render: function () {
        return <div onClick={this.props.onClick(this.props.location)}>{this.props.name || this.props.location}</div>
    }
})
