import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

export default class Satellite extends Component {
  static navigationOptions = { title: 'Basic usage' }

  render() {
    return <MapView style={StyleSheet.absoluteFill} />
  }
}
