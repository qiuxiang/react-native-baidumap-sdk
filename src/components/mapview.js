// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import Component from './component'
import { LatLng } from '../prop-types'

export default class MapView extends Component<{}> {
  nativeComponentName = 'BaiduMapView'

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

  render() {
    return <BaiduMapView {...this.props} removeClippedSubviews />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
