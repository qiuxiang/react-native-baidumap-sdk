// @flow
import React from 'react'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType, LocationPropType } from '../prop-types'
import type { LatLng, Location, MapStatus, Point, Region } from '../types'
import Component from '../component'

type Target = {
  center?: LatLng,
  point?: Point,
  region?: Region,
  overlook?: number,
  rotation?: number,
  zoomLevel?: number,
}

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
  scrollDisabled?: boolean,
  overlookDisabled?: boolean,
  rotateDisabled?: boolean,
  zoomDisalbed?: boolean,
  center?: LatLng,
  zoomLevel?: number,
  rotation?: number,
  overlook?: number,
  paused?: boolean,
  locationEnabled?: boolean,
  location?: Location,
  campassMode?: true,
  onLoad?: () => {},
  onClick?: LatLng => {},
  onLongClick?: LatLng => {},
  onDoubleClick?: LatLng => {},
  onStatusChange?: MapStatus => {},
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
    scrollDisabled: PropTypes.bool,
    overlookDisabled: PropTypes.bool,
    rotateDisabled: PropTypes.bool,
    zoomDisabled: PropTypes.bool,
    center: LatLngPropType,
    zoomLevel: PropTypes.number,
    rotation: PropTypes.number,
    overlook: PropTypes.number,
    locationEnabled: PropTypes.bool,
    location: LocationPropType,
    compassMode: PropTypes.bool,
    paused: PropTypes.bool,
  }

  nativeComponentName = 'BaiduMapView'

  animateTo(target: Target, duration?: number = 500) {
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
