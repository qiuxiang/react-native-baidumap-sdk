// @flow
import { mapComponents } from '../../utils'
import Basic from './basic'
import MapStatus from './map-status'
import AnimatedMapStatus from './animated-map-status'
import Satellite from './satellite'
import Traffic from './traffic'
import BaiduHeatMap from './baidu-heat-map'
import Indoor from './indoor'
import Events from './events'
import Gestures from './gestures'
import Controls from './controls'

export default mapComponents('mapView', {
  Basic,
  MapStatus,
  AnimatedMapStatus,
  Satellite,
  Traffic,
  BaiduHeatMap,
  Indoor,
  Events,
  Gestures,
  Controls,
})
