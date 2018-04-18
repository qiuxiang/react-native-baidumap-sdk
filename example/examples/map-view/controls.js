import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'
import { Switch } from '../common'

const style = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  controls: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#292c36',
  },
  control: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    marginTop: 4,
  },
})

export default class Gestures extends Component {
  static navigationOptions = { title: 'Controls' }

  state = {
    compassDisabled: false,
    zoomControlsDisabled: false,
    scaleBarDisabled: false,
  }

  renderControl(name) {
    const prop = `${name}Disabled`
    return (
      <View style={style.control}>
        <Switch
          onValueChange={value => this.setState({ [prop]: !value })}
          value={!this.state[prop]}
        />
        <Text style={style.label}>{name}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView style={style.mapView} {...this.state} />
        <View style={style.controls}>
          {this.renderControl('compass')}
          {this.renderControl('scaleBar')}
          {this.renderControl('zoomControls')}
        </View>
      </View>
    )
  }
}
