import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  buttons: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 8,
  },
  button: {
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(245,83,61,0.8)',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
})

export default class MapStatus extends Component {
  static navigationOptions = { title: 'Map status' }

  ZGC = {
    overlook: -45,
    rotation: 90,
    zoomLevel: 16,
    center: {
      latitude: 39.97837,
      longitude: 116.31363,
    },
  }

  TAM = {
    overlook: 0,
    rotation: 0,
    zoomLevel: 14,
    center: {
      latitude: 39.90864,
      longitude: 116.39745,
    },
  }

  toZGC = () => this.setState(this.ZGC)
  toTAM = () => this.setState(this.TAM)

  render() {
    return (
      <View style={styles.full}>
        <MapView style={styles.full} ref={ref => this.mapView = ref} {...this.state} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.toZGC}>
              <Text style={styles.text}>中关村</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.toTAM}>
              <Text style={styles.text}>天安门</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
