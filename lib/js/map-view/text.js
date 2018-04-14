// @flow
import { ColorPropType, requireNativeComponent, ViewPropTypes, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType } from '../prop-types'

/* eslint-disable import/no-mutable-exports */
let Text = null
if (Platform.OS === 'android') {
  Text = requireNativeComponent('BaiduMapText', {
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
} else {
  console.warn('iOS MapView.Text unimplemented')
}

export default Text
