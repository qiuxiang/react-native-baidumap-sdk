// @flow
import Single from './single'
import ReGeocode from './re-geocode'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  locationSingle: route(Single),
  locationReGeocode: route(ReGeocode),
}
