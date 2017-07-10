import React from 'react'
import ReactDom from 'react-dom'
import ajax from 'then-request'

require('./style.css')
require('./w350.css')
require('./w600.css')
require('./w768.css')
require('./w1024.css')
require('./w1280.css')

import Content from './Content'

const stations = {
  nw: ['Bål', 'Bro', 'Kän', 'Khä', 'Jkb', 'Bkb', 'Spå', 'Sub'],
  ne: ['U', 'Kn', 'Arnc', 'Mr', 'Rs', 'Upv', 'R', 'Nvk', 'Hgv', 'Sol', 'Hel', 'Udl', 'So'],
  c: ['Sod', 'Sci', 'Sst', 'Åbe', 'Äs'],
  sw: ['Sta', 'Hu', 'Flb', 'Tul', 'Tu', 'Rön', 'Öte', 'Söd', 'Söc', 'Söu', 'Jn', 'Mö', 'Gn'],
  se: ['Fas', 'Tåd', 'Skg', 'Hnd', 'Jbo', 'Vhe', 'Kda', 'Ts', 'Hfa', 'Ssä', 'Öso', 'Ngd', 'Gdv', 'Nyh']
}

const content = ReactDom.render(<Content stations={stations}/>, document.getElementById('content'))

function setStations(res) {
  content.setStations(JSON.parse(res.getBody()).RESPONSE.RESULT[0].TrainStation)
}

ajax('GET', '/json/stations').done(setStations)
