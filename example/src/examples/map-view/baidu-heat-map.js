import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { SwitchComponent } from '../common'

export default class BaiduHeatMap extends SwitchComponent {
  static navigationOptions = {
    ...SwitchComponent.navigationOptions,
    title: 'Baidu heat Map',
  }

  state = { baiduHeatMapEnabled: true }

  onSwitch(baiduHeatMapEnabled) {
    this.setState({ baiduHeatMapEnabled })
  }

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
      />
    )
  }
}
