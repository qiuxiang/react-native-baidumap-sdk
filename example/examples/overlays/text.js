import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Text extends Component {
  static navigationOptions = { title: 'Text' }

  render() {
    const props = {
      content: 'Hello',
      coordinate: { latitude: 39.906901, longitude: 116.397972 },
      fontSize: 24,
      color: '#fff',
      backgroundColor: 'rgba(245,83,61,0.9)',
    }

    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Text {...props} />
      </MapView>
    )
  }
}
