// @flow
import React, { Component } from 'react'
import { SectionList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import mapView from './map-view'

const style = StyleSheet.create({
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

const ListItem = withNavigation(({ title, routeName, navigation }) => (
  <TouchableNativeFeedback onPress={() => navigation.navigate(routeName)}>
    <View style={style.item}>
      <Text style={style.itemText}>{title}</Text>
    </View>
  </TouchableNativeFeedback>))

const SectionHeader = ({ section }: { section: { title: string } }) => (
  <Text style={style.sectionHeader}>{section.title}</Text>
)

const SectionFooter = () => <View style={style.sectionFooter} />

const mapComponents = components => Object.keys(components).map(key => ({
  key, title: components[key].title,
}))

class Examples extends Component<{}> {
  static navigationOptions = { title: 'Examples' }

  sections = [
    { title: 'MapView', data: mapComponents(mapView) },
  ]

  render() {
    return (
      <SectionList
        renderItem={({ item }) => <ListItem title={item.title} routeName={item.key} />}
        renderSectionHeader={SectionHeader}
        renderSectionFooter={SectionFooter}
        sections={this.sections}
      />
    )
  }
}

export default {
  examples: { screen: Examples },
  ...mapView,
}
