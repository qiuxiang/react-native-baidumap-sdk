import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Clustering extends Component {
  static navigationOptions = { title: 'Marker clustering' }

  onLoad = () => this.mapView.animateTo({ zoomLevel: 10 })
  onStatusChange = status => this.cluster.update(status)

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
      onLoad: this.onLoad,
      onStatusChange: this.onStatusChange,
    }
    return (
      <MapView {...props}>
        <MapView.Cluster
          ref={ref => this.cluster = ref}
          markers={this.markers}
          renderMarker={this.renderMarker}
        />
      </MapView>
    )
  }
}
