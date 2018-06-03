// @flow
import {
  ColorPropType,
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType } from '../prop-types'

export default requireNativeComponent('BaiduMapText', {
  propTypes: {
    ...ViewPropTypes,
    coordinate: LatLngPropType.isRequired,
    content: PropTypes.string,
    fontSize: PropTypes.number,
    rotation: PropTypes.number,
    color: ColorPropType,
    backgroundColor: ColorPropType,
  },
})
