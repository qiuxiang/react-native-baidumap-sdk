// @flow
import { mapComponents } from '../../utils'
import Polyline from './polyline'
import Polygon from './polygon'
import Circle from './circle'
import HeatMap from './heat-map'

export default mapComponents('overlays', {
  Polyline,
  Polygon,
  Circle,
  HeatMap,
})
