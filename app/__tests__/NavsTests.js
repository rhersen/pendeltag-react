jest.dontMock('../Navs')

const React = require('react')
const TestUtils = require('react-addons-test-utils')

const Navs = require('../Navs')
const StationLink = require('../StationLink')

describe('Navs', () => {
  let result

  beforeEach(() => {
    const stations = {
      nw: ['Bål', 'Kän', 'Spå', 'Sub'],
      ne: ['Upv', 'Nvk', 'So'],
      c: ['Sst'],
      sw: ['Tu', 'Söc', 'Gn'],
      se: ['Jbo', 'Hfa', 'Nyh']
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<Navs stations={stations} names={stations}/>)
    result = renderer.getRenderOutput()
  })

  it('northwest', () => {
    const nw = result.props.children[0].props.children
    expect(nw.length).toEqual(4)
    expect(nw[0].props.className).toEqual('w768 w1280')
    expect(nw[1].props.className).toEqual('w768 w1024 w1280')
    expect(nw[2].props.className).toEqual('w350 w768 w1024 w1280')
    expect(nw[3].props.className).toEqual('w350 w600 w768 w1024 w1280')
  })

  it('northeast', () => {
    const ne = result.props.children[1].props.children
    expect(ne.length).toEqual(3)
    expect(ne[0].props.className).toEqual('w768 w1280')
    expect(ne[1].props.className).toEqual('w768 w1024 w1280')
    expect(ne[2].props.className).toEqual('w600 w768 w1024 w1280')
  })

  it('central', () => {
    const c = result.props.children[2].props.children
    expect(c.length).toEqual(1)
    expect(c[0].props.className).toEqual('w350 w600 w768 w1024 w1280')
  })

  it('southwest', () => {
    const sw = result.props.children[3].props.children
    expect(sw.length).toEqual(3)
    expect(sw[0].props.className).toEqual('w350 w600 w768 w1024 w1280')
    expect(sw[1].props.className).toEqual('w768 w1280')
    expect(sw[2].props.className).toEqual('w1280')
  })

  it('southeast', () => {
    const se = result.props.children[3].props.children
    expect(se.length).toEqual(3)
    expect(se[0].props.className).toEqual('w350 w600 w768 w1024 w1280')
    expect(se[1].props.className).toEqual('w768 w1280')
    expect(se[2].props.className).toEqual('w1280')
  })
})