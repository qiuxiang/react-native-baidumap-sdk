import { ColorPropType, requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLng } from '../prop-types'

export default requireNativeComponent('BaiduMapPolygon', {
  propTypes: {
    ...ViewPropTypes,
    points: PropTypes.arrayOf(LatLng).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: ColorPropType,
    fillColor: ColorPropType,
  },
})
