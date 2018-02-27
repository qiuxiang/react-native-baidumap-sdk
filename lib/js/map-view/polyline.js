import { ColorPropType, requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType } from '../prop-types'

export default requireNativeComponent('BaiduMapPolyline', {
  propTypes: {
    ...ViewPropTypes,
    points: PropTypes.arrayOf(LatLngPropType).isRequired,
    width: PropTypes.number,
    color: ColorPropType,
    colors: PropTypes.arrayOf(ColorPropType),
  },
})
