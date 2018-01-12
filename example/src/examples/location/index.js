// @flow
import Single from './single'
import Detailed from './detailed'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  mapViewSingle: route(Single),
  mapViewDetailed: route(Detailed),
}
