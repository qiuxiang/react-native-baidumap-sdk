import MapView from './map-view'
import Location from './location'
import Utils from './utils'
import PropTypes from './prop-types'

export default {
  MapView,
  Location,
  Utils,
  PropTypes,
}

export {
  MapView,
  Location,
  Utils,
  PropTypes,
}

export type LatLng = {
  latitude: number,
  longitude: number,
}

export type Region = {
  latitudeDelta: number,
  longitudeDelta: number,
} & LatLng

export type MapStatus = {
  center?: LatLng,
  region?: Region,
  overlook?: number,
  rotation?: number,
  zoomLevel?: number,
}
