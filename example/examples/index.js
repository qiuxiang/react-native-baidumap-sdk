// @flow
import React, { Component } from 'react'
import { SectionList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import mapView from './map-view'
import location from './location'
import marker from './marker'
import overlays from './overlays'

const style = StyleSheet.create({
  body: {
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 16,
  },
  itemText: {
    color: '#212121',
    fontSize: 18,
  },
  sectionHeader: {
    color: '#757575',
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bdbdbd',
  },
  sectionFooter: {
    height: 16,
  },
})

const ListItem = withNavigation(({ title, route, navigation }) => (
  <TouchableNativeFeedback onPress={() => navigation.navigate(route)}>
    <View style={style.item}>
      <Text style={style.itemText}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
))

function renderSectionHeader({ section }: { section: { title: string } }) {
  return <Text style={style.sectionHeader}>{section.title}</Text>
}

function renderSectionFooter() {
  return <View style={style.sectionFooter} />
}

function mapScreens(components) {
  return Object.keys(components).map(key => ({ key, title: components[key].title }))
}

class Examples extends Component<{}> {
  static navigationOptions = { title: 'Examples' }

  sections = [
    { title: 'MapView', data: mapScreens(mapView) },
    { title: 'Location', data: mapScreens(location) },
    { title: 'Marker', data: mapScreens(marker) },
    { title: 'Overlays', data: mapScreens(overlays) },
  ]

  render() {
    return (
      <SectionList
        style={style.body}
        renderItem={({ item }) => <ListItem title={item.title} route={item.key} />}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        sections={this.sections}
      />
    )
  }
}

export default {
  examples: { screen: Examples },
  ...mapView,
  ...location,
  ...marker,
  ...overlays,
}
