// @flow
import Polygon from './polygon'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  overlaysPolygon: route(Polygon),
}
