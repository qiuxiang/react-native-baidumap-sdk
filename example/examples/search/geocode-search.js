import React, { Component } from 'react'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { MapView, Geocode } from 'react-native-baidumap-sdk'

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#292c36',
  },
  form: {
    padding: 15,
  },
  mapView: {
    flex: 1,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
})

export default class GeocodeSearch extends Component {
  static navigationOptions = { title: 'Geocode search' }

  state = {}

  address = '海龙大厦'
  city = ''

  search = () => {
    Geocode.search(this.address, this.city)
      .then(result => {
        this.mapView.setStatus({ center: result }, 1000)
        this.setState(result)
        this.marker.select()
      })
      .catch(() => Alert.alert('Not found'))
  }

  render() {
    return (
      <View style={style.body}>
        <MapView ref={ref => this.mapView = ref} style={style.mapView}>
          {this.state.address &&
            <MapView.Marker
              ref={ref => this.marker = ref}
              title={this.state.address}
              coordinate={this.state}
            />
          }
        </MapView>
        <View style={style.form}>
          <TextInput
            defaultValue={this.address}
            style={style.input}
            returnKeyType="search"
            placeholder="Address"
            placeholderTextColor="#9e9e9e"
            onChangeText={text => this.address = text}
            onSubmitEditing={this.search}
          />
          <TextInput
            style={style.input}
            returnKeyType="search"
            placeholder="City"
            placeholderTextColor="#9e9e9e"
            onChangeText={text => this.city = text}
            onSubmitEditing={this.search}
          />
          <Button title="Search" onPress={this.search} />
        </View>
      </View>
    )
  }
}
