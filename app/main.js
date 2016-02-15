const React = require('react')

require("./style.css")
const Content = require('./Content')

const stations = {
    nw: ['Kän', 'Khä', 'Jkb', 'Bkb', 'Spå', 'Sub'],
    ne: ['Nvk', 'Hgv', 'Sol', 'Hel', 'Udl', 'So'],
    c: ['Ke', 'Cst', 'Sst', 'Åbe', 'Äs'],
    sw: ['Sta', 'Hu', 'Flb', 'Tul', 'Tu', 'Rön', 'Öte', 'Söd'],
    se: ['Fas', 'Tåd', 'Skg', 'Hnd', 'Jbo', 'Vhe', 'Kda', 'Ts']
}

const content = require('react-dom').render(<Content stations={stations}/>, document.getElementById('content'))

function setStations(res) {
    content.setStations(JSON.parse(res.getBody()).RESPONSE.RESULT[0].TrainStation)
}

require('then-request')('GET', 'api/stations').done(setStations)
