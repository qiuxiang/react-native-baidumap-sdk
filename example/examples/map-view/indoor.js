import React from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { SwitchScreen } from '../common'

export default class Indoor extends SwitchScreen {
  static navigationOptions = {
    ...SwitchScreen.navigationOptions,
    title: 'Indoor map',
  }

  state = { indoorEnabled: true }

  onSwitch(indoorEnabled) {
    this.setState({ indoorEnabled })
  }

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        center={{
          latitude: 39.916932,
          longitude: 116.379333,
        }}
        zoomLevel={19}
        indoorEnabled={this.state.indoorEnabled}
      />
    )
  }
}
