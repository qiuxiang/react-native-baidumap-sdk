// @flow
import Polygon from './polygon'
import Text from './text'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  overlaysPolygon: route(Polygon),
  overlaysText: route(Text),
}
