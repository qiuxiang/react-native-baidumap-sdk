import Satellite from './satellite'
import Basic from './basic'

export default {
  mapViewBasic: {
    title: Basic.navigationOptions.title,
    screen: Basic,
  },
  mapViewSatellite: {
    title: Satellite.navigationOptions.title,
    screen: Satellite,
  },
}
