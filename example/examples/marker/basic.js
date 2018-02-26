import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Basic extends Component {
  static navigationOptions = { title: 'Basic usage' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} zoomLevel={11}>
        <MapView.Marker
          selected
          title="This is a marker"
          color="#3498db"
          onPress={() => Alert.alert('You pressed the marker!')}
          onCalloutPress={() => Alert.alert('You pressed the callout!')}
          coordinate={{ latitude: 39.914884, longitude: 116.403883 }}
        />
      </MapView>
    )
  }
}
