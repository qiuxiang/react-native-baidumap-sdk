import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { SwitchScreen } from '../common'

export default class Satellite extends SwitchScreen {
  static navigationOptions = {
    ...SwitchScreen.navigationOptions,
    title: 'Satellite map',
  }

  state = { satellite: true }

  onSwitch(satellite) {
    this.setState({ satellite })
  }

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        satellite={this.state.satellite}
      />
    )
  }
}
