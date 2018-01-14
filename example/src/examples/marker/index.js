// @flow
import Basic from './basic'
import Callout from './callout'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  markerBasic: route(Basic),
  markerCallout: route(Callout),
}
