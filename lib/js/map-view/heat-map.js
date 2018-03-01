import { requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const Point = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  intensity: PropTypes.number,
})

export default requireNativeComponent('BaiduMapHeatMap', {
  propTypes: {
    ...ViewPropTypes,
    points: PropTypes.arrayOf(Point).isRequired,
    radius: PropTypes.number,
    opacity: PropTypes.number,
  },
})
