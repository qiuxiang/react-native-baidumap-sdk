// @flow
import React from 'react'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLngPropType, LocationPropType, mapEventsPropType } from '../prop-types'
import type { LatLng, Location, MapStatus, Point, Region } from '../types'
import Component from '../component'

type Status = {
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
  locationMode?: 'normal' | 'follow' | 'compass',
  campassMode?: true,
  onLoad?: () => {},
  onClick?: LatLng => {},
  onLongClick?: LatLng => {},
  onDoubleClick?: LatLng => {},
  onStatusChange?: MapStatus => {},
} & ViewPropTypes

const events = [
  'onLoad',
  'onClick',
  'onLongClick',
  'onDoubleClick',
  'onStatusChange',
]

export default class MapView extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
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
    locationMode: PropTypes.string,
    paused: PropTypes.bool,
  }

  setStatus(status: Status, duration?: number = 0) {
    this.call('setStatus', [status, duration])
  }

  nativeComponentName = 'BaiduMapView'

  render() {
    const props = {
      ...this.props,
      ...this.handlers(events),
    }
    return <BaiduMapView {...props} />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
