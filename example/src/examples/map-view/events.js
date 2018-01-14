import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

const style = StyleSheet.create({
  full: {
    flex: 1,
  },
  logs: {
    elevation: 8,
    backgroundColor: '#292c36',
  },
  item: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
  },
  time: {
    color: '#757575',
    fontSize: 12,
  },
  label: {
    marginLeft: 8,
    color: '#f5533d',
    fontSize: 12,
  },
  data: {
    color: '#eee',
    fontSize: 12,
  },
})

export default class EventsExample extends Component {
  static navigationOptions = { title: 'Events' }

  state = { logs: [] }

  onLoad = this.logger('onLoad')
  onClick = this.logger('onClick')
  onLongClick = this.logger('onLongClick')
  onDoubleClick = this.logger('onDoubleClick')
  onStatusChange = this.logger('onStatusChange')

  logger(event) {
    return data => {
      this.setState({
        logs: [
          {
            event,
            key: Math.random(),
            time: new Date().toLocaleString(),
            data: JSON.stringify(data, null, 2),
          },
          ...this.state.logs,
        ],
      })
    }
  }

  renderItem = ({ item }) => (
    <View style={style.item}>
      <View style={style.itemHeader}>
        <Text style={style.time}>{item.time}</Text>
        <Text style={style.label}>{item.event}</Text>
      </View>
      {item.data !== '{}' && <Text style={style.data}>{item.data}</Text>}
    </View>
  )

  render() {
    return (
      <View style={style.full}>
        <MapView
          style={style.full}
          onLoad={this.onLoad}
          onClick={this.onClick}
          onLongClick={this.onLongClick}
          onDoubleClick={this.onDoubleClick}
          onStatusChange={this.onStatusChange}
        />
        <FlatList
          style={style.logs}
          data={this.state.logs}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
