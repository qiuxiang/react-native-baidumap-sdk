import React, { Component } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import image from '../../images/ic_my_location.png'

const style = StyleSheet.create({
  callout: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2980b9',
    flexDirection: 'row',
    width: 160,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
    tintColor: '#f39c12',
  },
  text: {
    flex: 1,
    color: '#fff',
  },
})

const { Marker, Callout } = MapView
const coordinate = { latitude: 39.914884, longitude: 116.403883 }

export default class CalloutExample extends Component {
  static navigationOptions = { title: 'Custom callout' }

  onPress = () => Alert.alert('You pressed the callout!')

  render() {
    return (
      <MapView style={StyleSheet.absoluteFill} zoomLevel={11}>
        <Marker coordinate={coordinate} selected>
          <Callout onPress={this.onPress}>
            <View style={style.callout}>
              <Image source={image} style={style.image} />
              <Text style={style.text}>{'Hello\nReact Native'}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    )
  }
}
