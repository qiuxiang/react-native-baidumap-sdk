import React, { Component } from 'react'
import { StyleSheet, Switch } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import EventEmitter from 'EventEmitter'

const event = new EventEmitter()

class Button extends Component {
  state = { value: true }

  onValueChange = () => {
    event.emit('change', !this.state.value)
    this.setState({ value: !this.state.value })
  }

  render() {
    return <Switch value={this.state.value} onValueChange={this.onValueChange} />
  }
}

export default class Satellite extends Component {
  static navigationOptions = {
    title: 'Satellite',
    headerRight: <Button />,
  }

  state = { satellite: true }

  componentDidMount() {
    event.addListener('change', value => this.setState({ satellite: value }))
  }

  componentWillUnmount() {
    event.removeAllListeners()
  }

  render() {
    return <MapView satellite={this.state.satellite} style={StyleSheet.absoluteFill} />
  }
}
