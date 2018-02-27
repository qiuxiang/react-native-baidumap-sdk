// @flow
import { mapComponents } from '../../utils'
import Polyline from './polyline'
import Polygon from './polygon'
import Circle from './circle'
import Text from './text'

export default mapComponents('overlays', {
  Polyline,
  Polygon,
  Circle,
  Text,
})
