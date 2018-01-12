// @flow
import React, { Component } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import { MapView, Location } from 'react-native-baidumap-sdk'
import icon from '../../images/ic_my_location.png'
import { IconButton } from '../common'

const requestLocation = () => {
  Location.start()
  Location.request()
  ToastAndroid.show('Request location...', ToastAndroid.SHORT)
}

export default class Single extends Component<{}> {
  static navigationOptions = {
    title: 'Single location',
    headerRight: <IconButton source={icon} onPress={requestLocation} />,
  }

  componentDidMount() {
    Location.addLocationListener(location => {
      ToastAndroid.show(`${location.latitude}, ${location.longitude}`, ToastAndroid.SHORT)
      if (this.mapView) {
        this.mapView.animateTo({
          center: location,
          zoomLevel: 14,
        })
      }
    }, 2000)
  }

  mapView: MapView

  render() {
    return <MapView style={StyleSheet.absoluteFill} ref={ref => this.mapView = ref} />
  }
}
