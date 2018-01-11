// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import { LatLng } from '../prop-types'
import Component from './component'

export type MapStatus = {
  zoomLevel?: number,
  coordinate?: LatLng,
  overlook?: number,
  rotation?: number,
}

export default class MapView extends Component<{}> {
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
    center: LatLng,
    zoomLevel: PropTypes.number,
    rotation: PropTypes.number,
    overlook: PropTypes.number,
  }

  nativeComponentName = 'BaiduMapView'

  animateTo(target: MapStatus, duration?: number = 500) {
    this.call('animateTo', [target, duration])
  }

  render() {
    return <BaiduMapView {...this.props} removeClippedSubviews />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
