/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import EventSubscription from 'EventSubscription'
import { MapView, Location } from 'react-native-baidumap-sdk'
import icon from '../../images/ic_my_location.png'
import { IconButton } from '../common'

const requestLocation = () => {
  Location.request()
  ToastAndroid.show('Request location...', ToastAndroid.SHORT)
}

export default class Single extends Component {
  static navigationOptions = {
    title: 'Single location',
    headerRight: <IconButton source={icon} onPress={requestLocation} />,
  }

  state = {}

  componentDidMount() {
    Location.setOptions({ coordinateType: 'bd09ll' })
    this.listener = Location.addLocationListener(location => {
      console.log(location)
      ToastAndroid.show(`${location.latitude}, ${location.longitude}`, ToastAndroid.SHORT)
      this.setState(location)
      if (this.mapView) {
        this.mapView.animateTo({
          center: location,
          zoomLevel: 14,
        })
      }
    })
  }

  componentWillUnmount() {
    Location.stop()
    this.listener.remove()
  }

  mapView: MapView
  listener: EventSubscription

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} ref={ref => this.mapView = ref}>
        {this.state.latitude && (
          <MapView.Marker coordinate={this.state} title="My location" selected />
        )}
      </MapView>
    )
  }
}
