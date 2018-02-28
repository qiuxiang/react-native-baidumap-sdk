import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class ImageMarker extends Component {
  static navigationOptions = { title: 'Custom Image' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} zoomLevel={11}>
        <MapView.Marker
          selected
          title="This is a image marker"
          image="flag"
          onPress={() => Alert.alert('You pressed the marker!')}
          onCalloutPress={() => Alert.alert('You pressed the callout!')}
          coordinate={{ latitude: 39.914884, longitude: 116.403883 }}
        />
      </MapView>
    )
  }
}
