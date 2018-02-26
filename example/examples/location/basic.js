import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Location } from 'react-native-baidumap-sdk'

const style = StyleSheet.create({
  body: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    color: '#f5533d',
    width: 120,
  },
})

export default class Basic extends Component {
  static navigationOptions = { title: 'Basic usage' }

  state = {}

  async componentDidMount() {
    await Location.init()
    Location.setOptions({ gps: true })
    this.listener = Location.addLocationListener(location => this.setState(location))
    Location.start()
  }

  componentWillUnmount() {
    Location.stop()
    this.listener.remove()
  }

  render() {
    return (
      <View style={style.body}>
        {Object.keys(this.state).map(key => (
          <View style={style.item} key={key}>
            <Text style={style.label}>{key}</Text>
            <Text>{this.state[key]}</Text>
          </View>
        ))}
      </View>
    )
  }
}
