// @flow
import React from 'react'
import { requireNativeComponent, ViewPropTypes } from 'react-native'
import Component from './component'

export default class MapView extends Component<{}> {
  nativeComponentName = 'BaiduMapView'

  static propTypes = {
    ...ViewPropTypes,
  }

  render() {
    return <BaiduMapView {...this.props} />
  }
}

const BaiduMapView = requireNativeComponent('BaiduMapView', MapView)
