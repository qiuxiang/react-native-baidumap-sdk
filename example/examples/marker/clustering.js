import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Clustering extends Component {
  static navigationOptions = { title: 'Marker clustering' }

  onStatusChange = status => {
    this.status = status
    this.cluster.update(status)
  }

  onPress = cluster => {
    this.mapView.setStatus({
      center: cluster.coordinate,
      zoomLevel: this.status.zoomLevel + 1,
    }, 500)
  }

  markers = Array(100).fill(0).map((_, i) => ({
    coordinate: {
      latitude: 39.5 + Math.random(),
      longitude: 116 + Math.random(),
    },
    extra: { key: `Marker${i}` },
  }))

  renderMarker = item => (
    <MapView.Marker
      key={item.extra.key}
      title={item.extra.key}
      coordinate={item.coordinate}
    />
  )

  render() {
    const props = {
      ref: ref => this.mapView = ref,
      style: StyleSheet.absoluteFill,
      onStatusChange: this.onStatusChange,
    }

    return (
      <MapView {...props}>
        <MapView.Cluster
          onPress={this.onPress}
          ref={ref => this.cluster = ref}
          markers={this.markers}
          renderMarker={this.renderMarker}
        />
      </MapView>
    )
  }
}
