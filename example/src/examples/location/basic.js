// @flow
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView, Location } from 'react-native-baidumap-sdk'

export default class Satellite extends Component<{}> {
  static navigationOptions = { title: 'Basic usage' }

  onReady = () => {
    Location.addLocationListener(location => {
      console.log(location)
      this.mapView.animateTo({
        center: location,
        zoomLevel: 14,
      })
    })
    Location.start()
  }

  mapView: MapView

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        ref={ref => this.mapView = ref}
        onReady={this.onReady}
      />
    )
  }
}
