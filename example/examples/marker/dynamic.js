import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Dynamic extends Component {
  static navigationOptions = { title: 'Dynamically add and remove' }

  state = { markers: [] }

  componentDidMount() {
    Alert.alert('Press the map to add a marker and press the marker to remove')
  }

  addMarker = coordinate => this.setState({
    markers: [...this.state.markers, {
      coordinate,
      key: Math.random(),
    }],
  })

  removeMarker(marker) {
    this.setState({ markers: this.state.markers.filter(item => item !== marker) })
  }

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} onClick={this.addMarker}>
        {this.state.markers.map(item => (
          <MapView.Marker {...item} onPress={() => this.removeMarker(item)} />
        ))}
      </MapView>
    )
  }
}
