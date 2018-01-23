import PropTypes from 'prop-types'

export const LatLngPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

export const RegionPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitudeDelta: PropTypes.number.isRequired,
  longitudeDelta: PropTypes.number.isRequired,
})

export const PointPropType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

export const LocationPropType = PropTypes.shape({
  accuracy: PropTypes.number,
  direction: PropTypes.number,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
})

export default {
  LatLngPropType,
  RegionPropType,
  PointPropType,
  LocationPropType,
}
