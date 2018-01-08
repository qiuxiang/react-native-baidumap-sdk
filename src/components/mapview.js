// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { requireNativeComponent, ViewPropTypes, View } from 'react-native'
import { LatLng, Region } from '../prop-types'
import Component from './component'

export type MapStatus = {
  zoomLevel?: number,
  coordinate?: LatLng,
  titl?: number,
  rotation?: number,
}

export default class MapView extends Component<any> {
  name = 'BaiduMapView'

  static propTypes = {
    ...ViewPropTypes,
  }

  /**
   * animate to target map status
   */
  animateTo(target: MapStatus, duration?: number = 500) {
    this.run('animateTo', [target, duration])
  }

  render() {
    return <BaiduMapView {...this.props} />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
