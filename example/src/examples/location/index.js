// @flow
import Single from './single'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  mapViewSingle: route(Single),
}
