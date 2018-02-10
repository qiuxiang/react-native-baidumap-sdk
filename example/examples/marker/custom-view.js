import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

const style = StyleSheet.create({
  marker: {
    flexDirection: 'row',
    backgroundColor: '#f5533d',
    borderRadius: 4,
    padding: 8,
  },
  image: {
    width: 42,
    height: 42,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    color: '#eee',
    fontSize: 12,
  },
})

export default class CustomView extends Component {
  static navigationOptions = { title: 'Custom view' }

  state = { time: new Date() }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ time: new Date() }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  renderMarker = () => (
    <View style={style.marker}>
      <Image style={style.image} source={{ uri: 'https://avatars0.githubusercontent.com/u/1709072?s=100&v=4' }} />
      <View>
        <Text style={style.title}>The custom view marker</Text>
        <Text style={style.time}>{this.state.time.toLocaleString()}</Text>
      </View>
    </View>
  )

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} zoomLevel={11}>
        <MapView.Marker
          ref={ref => this.marker = ref}
          title="This is a custom view"
          view={this.renderMarker}
          coordinate={{ latitude: 39.914884, longitude: 116.403883 }}
        />
      </MapView>
    )
  }
}
