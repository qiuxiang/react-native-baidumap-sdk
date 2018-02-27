// @flow
import { ColorPropType, requireNativeComponent, ViewPropTypes, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType } from '../prop-types'

export default Platform.select({
  android: requireNativeComponent('BaiduMapText', {
    propTypes: {
      ...ViewPropTypes,
      coordinate: LatLngPropType.isRequired,
      content: PropTypes.string,
      fontSize: PropTypes.number,
      rotation: PropTypes.number,
      color: ColorPropType,
      backgroundColor: ColorPropType,
    },
  }),
  ios() {
    console.warn('iOS MapView.Text unimplemented')
    return null
  },
})
