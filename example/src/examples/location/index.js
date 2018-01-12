// @flow
import Basic from './basic'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  mapViewBasic: route(Basic),
}
