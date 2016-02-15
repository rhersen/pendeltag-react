const React = require('react')

require("./style.css")
const Navs = require('./Navs')

const navs = require('react-dom').render(<Navs />, document.getElementById('content'))

function setStations(res) {
    navs.setStations(JSON.parse(res.getBody()).RESPONSE.RESULT[0].TrainStation)
}

require('then-request')('GET', 'api/stations').done(setStations)
