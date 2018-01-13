// @flow
import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Basic extends Component<{}> {
  static navigationOptions = { title: 'Basic usage' }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}>
        <MapView.Marker
          onClick={() => Alert.alert('onClick')}
          coordinate={{
            latitude: 39.916932,
            longitude: 116.379333,
          }}
        />
      </MapView>
    )
  }
}
