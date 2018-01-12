import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Location } from 'react-native-baidumap-sdk'

const style = StyleSheet.create({
  body: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    color: '#f5533d',
    width: 120,
  },
})

export default class Detailed extends Component {
  static navigationOptions = { title: 'Location with detailed data' }

  state = {}

  componentDidMount() {
    Location.setOptions({ detailed: true })
    Location.request()
    this.listener = Location.addLocationListener(location => this.setState(location))
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
