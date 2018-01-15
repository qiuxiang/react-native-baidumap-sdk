// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { ColorPropType, requireNativeComponent, ViewPropTypes } from 'react-native'
import { LatLng } from '../prop-types'
import Component from '../component'

type Props = {
  coordinate: LatLng,
  color?: ColorPropType,
  image?: string,
  title?: string,
  selected?: boolean,
} & ViewPropTypes

export default class Marker extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    coordinate: LatLng.isRequired,
    color: ColorPropType,
    image: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }

  nativeComponentName = 'BaiduMapMarker'

  select() {
    this.call('select')
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers(['onPress', 'onCalloutPress']),
    }
    return <BaiduMapMarker {...props} />
  }
}

const BaiduMapMarker = requireNativeComponent('BaiduMapMarker', Marker)
