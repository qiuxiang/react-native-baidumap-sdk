import React, { Component } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { MapView, Geocode } from 'react-native-baidumap-sdk'

export default class GeocodeReverse extends Component {
  static navigationOptions = { title: 'Geocode reverse' }

  state = {}

  componentDidMount() {
    Alert.alert('Long press the map to pick some point')
  }

  reverse = async coordinate => {
    const result = await Geocode.reverse(coordinate)
    this.setState(result)
    this.marker.select()
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView style={StyleSheet.absoluteFill} onLongClick={this.reverse}>
          {this.state.address &&
            <MapView.Marker
              selected
              ref={ref => this.marker = ref}
              key={Math.random()}
              title={this.state.address}
              onCalloutPress={() => Alert.alert(Object.keys(this.state)
                .filter(key => key !== 'latitude' && key !== 'longitude')
                .map(key => `${key}: ${this.state[key]}`)
                .join('\n'))
              }
              coordinate={this.state}
            />
          }
        </MapView>
      </View>
    )
  }
}
