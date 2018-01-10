import Basic from './basic'
import MapStatus from './map-status'
import AnimatedMapStatus from './animated-map-status'
import Satellite from './satellite'
import Indoor from './indoor'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  mapViewBasic: route(Basic),
  mapViewMapStatus: route(MapStatus),
  mapViewAnimatedMapStatus: route(AnimatedMapStatus),
  mapViewSatellite: route(Satellite),
  mapViewIndoor: route(Indoor),
}
