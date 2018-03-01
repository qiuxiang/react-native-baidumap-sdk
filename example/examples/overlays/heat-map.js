import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class HeatMap extends Component {
  static navigationOptions = { title: 'HeatMap' }

  coordinates = (new Array(200)).fill(0).map(() => ({
    latitude: 39.5 + Math.random(),
    longitude: 116 + Math.random(),
    intensity: Math.random(),
  }))

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.HeatMap
          points={this.coordinates}
          radius={50}
          opacity={0.5}
        />
      </MapView>
    )
  }
}
