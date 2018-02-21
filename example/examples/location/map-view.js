import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MapView, Location } from 'react-native-baidumap-sdk'
import icon from '../../images/ic_my_location.png'

const style = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 40,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 12,
    tintColor: '#616161',
  },
})

export default class MapViewExample extends Component {
  static navigationOptions = { title: 'Location in MapView' }

  state = {}

  async componentDidMount() {
    await Location.init()
    Location.setOptions({ gps: true })
    this.listener = Location.addLocationListener(location => {
      this.setState({ location })
    })
    Location.start()
  }

  componentWillUnmount() {
    Location.stop()
    this.listener.remove()
  }

  location = () => this.mapView.setStatus({ center: this.state.location }, 1000)

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          ref={ref => this.mapView = ref}
          style={StyleSheet.absoluteFill}
          zoomLevel={18}
          location={this.state.location}
          locationEnabled
          zoomControlsDisabled
        />
        <View style={style.button}>
          <TouchableOpacity onPress={this.location}>
            <Image style={style.icon} source={icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
