// @flow
import React from 'react'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType } from '../prop-types'
import Component from '../component'
import type { LatLng, MapStatus } from '../types'

type Props = {
  satellite?: boolean,
  trafficEnabled?: boolean,
  baiduHeatMapEnabled?: boolean,
  indoorEnabled?: boolean,
  buildingsDisabled?: boolean,
  minZoomLevel?: number,
  maxZoomLevel?: number,
  compassDisabled?: boolean,
  zoomControlsDisabled?: boolean,
  scaleBarDisabled?: boolean,
  center?: LatLng,
  zoomLevel?: number,
  rotation?: number,
  overlook?: number,
  paused?: boolean,
  onLoad?: () => {},
  onClick?: LatLng => {},
  onLongClick?: LatLng => {},
  onDoubleClick?: LatLng => {},
  onStatusChange?: LatLng => {},
} & ViewPropTypes

export default class MapView extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    satellite: PropTypes.bool,
    trafficEnabled: PropTypes.bool,
    baiduHeatMapEnabled: PropTypes.bool,
    indoorEnabled: PropTypes.bool,
    buildingsDisabled: PropTypes.bool,
    minZoomLevel: PropTypes.number,
    maxZoomLevel: PropTypes.number,
    compassDisabled: PropTypes.bool,
    zoomControlsDisabled: PropTypes.bool,
    scaleBarDisabled: PropTypes.bool,
    center: LatLngPropType,
    zoomLevel: PropTypes.number,
    rotation: PropTypes.number,
    overlook: PropTypes.number,
    paused: PropTypes.bool,
  }

  nativeComponentName = 'BaiduMapView'

  animateTo(target: MapStatus, duration?: number = 500) {
    this.call('animateTo', [target, duration])
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers([
        'onLoad',
        'onClick',
        'onLongClick',
        'onDoubleClick',
        'onStatusChange',
      ]),
    }
    return <BaiduMapView {...props} />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
