// @flow
import React from 'react'
import type { ComponentType } from 'react'
import PropTypes from 'prop-types'
import {
  ColorPropType,
  Platform,
  requireNativeComponent,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'
import { LatLngPropType, PointPropType, mapEventsPropType } from '../prop-types'
import Component from '../component'
import type { LatLng, Point } from '../types'

const style = StyleSheet.create({
  marker: {
    position: 'absolute',
  },
})

type Props = {
  coordinate: LatLng,
  color?: ColorPropType,
  image?: string,
  view?: ComponentType<*>,
  title?: string,
  selected?: boolean,
  draggable?: boolean,
  flat?: boolean,
  centerOffset?: Point,
  onPress?: () => void,
  onCalloutPress?: () => void,
  onDrag?: (coordinate: LatLng) => void,
  onDragStart?: (coordinate: LatLng) => void,
  onDragEnd?: (coordinate: LatLng) => void,
} & ViewPropTypes

const events = ['onPress', 'onCalloutPress', 'onDrag', 'onDragStart', 'onDragEnd']

export default class Marker extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    coordinate: LatLngPropType.isRequired,
    color: ColorPropType,
    image: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    draggable: PropTypes.bool,
    flat: PropTypes.bool,
    centerOffset: PointPropType,
  }

  componentDidUpdate() {
    if (this.props.view && Platform.OS === 'android') {
      this.update()
    }
  }

  nativeComponentName = 'BaiduMapMarker'

  select() {
    this.call('select')
  }

  update() {
    this.call('update')
  }

  renderMarkerView() {
    if (this.props.view) {
      // $FlowFixMe
      const markerView = <this.props.view />
      return (
        <View style={style.marker} key="marker">{markerView}</View>
      )
    }
    return null
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers(events),
      children: [this.props.children, this.renderMarkerView()],
    }
    return <BaiduMapMarker {...props} />
  }
}

const BaiduMapMarker = requireNativeComponent('BaiduMapMarker', Marker)
