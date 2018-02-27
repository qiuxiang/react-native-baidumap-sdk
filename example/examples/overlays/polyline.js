import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

const points = [
  {
    latitude: 39.806901,
    longitude: 116.397972,
  },
  {
    latitude: 39.806901,
    longitude: 116.297972,
  },
  {
    latitude: 39.906901,
    longitude: 116.397972,
  },
]

export default class Polyline extends Component {
  static navigationOptions = { title: 'Polyline' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Polyline
          points={points}
          width={2}
          color="rgba(0, 0, 255, 0.5)"
        />
      </MapView>
    )
  }
}
