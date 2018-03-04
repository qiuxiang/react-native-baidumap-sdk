import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Circle extends Component {
  static navigationOptions = { title: 'Circle' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Circle
          center={{ latitude: 39.914884, longitude: 116.403883 }}
          radius={10000}
          strokeWidth={2}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(255, 0, 0, 0.5)"
        />
      </MapView>
    )
  }
}
