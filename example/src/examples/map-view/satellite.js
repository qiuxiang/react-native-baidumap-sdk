import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { SwitchComponent } from '../common'

export default class Satellite extends SwitchComponent {
  static navigationOptions = {
    ...SwitchComponent.navigationOptions,
    title: 'Satellite Map',
  }

  state = { satellite: true }

  onSwitch(satellite) {
    this.setState({ satellite })
  }

  render() {
    return <MapView
      style={StyleSheet.absoluteFill}
      satellite={this.state.satellite}
    />
  }
}
