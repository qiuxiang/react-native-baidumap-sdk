import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { SwitchScreen } from '../common'

export default class BaiduHeatMap extends SwitchScreen {
  static navigationOptions = {
    ...SwitchScreen.navigationOptions,
    title: 'Baidu heat map',
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
