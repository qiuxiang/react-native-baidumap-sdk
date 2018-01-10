import Basic from './basic'
import MapStatus from './map-status'
import Satellite from './satellite'
import Indoor from './indoor'

export default {
  mapViewBasic: {
    title: Basic.navigationOptions.title,
    screen: Basic,
  },
  mapViewMapStatus: {
    title: MapStatus.navigationOptions.title,
    screen: MapStatus,
  },
  mapViewSatellite: {
    title: Satellite.navigationOptions.title,
    screen: Satellite,
  },
  mapViewIndoor: {
    title: Indoor.navigationOptions.title,
    screen: Indoor,
  },
}
