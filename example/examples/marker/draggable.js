import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Basic extends Component {
  static navigationOptions = { title: 'Draggable' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} zoomLevel={11}>
        <MapView.Marker
          selected
          draggable
          title="This is a draggable marker"
          onDragEnd={coordinate => Alert.alert(`${coordinate.latitude}, ${coordinate.longitude}`)}
          coordinate={{ latitude: 39.914884, longitude: 116.403883 }}
        />
      </MapView>
    )
  }
}
