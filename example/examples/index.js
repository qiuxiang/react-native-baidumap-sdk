import React, { Component } from "react";
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import mapView from "./map-view";
import location from "./location";
import marker from "./marker";
import overlays from "./overlays";
import search from "./search";

let Touchable = TouchableHighlight;
if (Platform.OS === "android") {
  Touchable = TouchableNativeFeedback;
}

const style = StyleSheet.create({
  body: {
    backgroundColor: "#f5f5f5",
  },
  item: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  itemText: {
    color: "#212121",
    fontSize: 18,
  },
  sectionHeader: {
    color: "#757575",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#bdbdbd",
  },
  sectionFooter: {
    height: 16,
  },
});

const ListItem = ({ title, route }) => {
  const navigation = useNavigation();
  return (
    <Touchable onPress={() => navigation.navigate(route)}>
      <View style={style.item}>
        <Text style={style.itemText}>{title}</Text>
      </View>
    </Touchable>
  );
};

function renderSectionHeader({ section }) {
  return <Text style={style.sectionHeader}>{section.title}</Text>;
}

function renderSectionFooter() {
  return <View style={style.sectionFooter} />;
}

function mapScreens(components) {
  return Object.keys(components).map((key) => ({
    key,
    title: components[key].title,
  }));
}

class Examples extends Component {
  static navigationOptions = { title: "Examples" };

  sections = [
    { title: "MapView", data: mapScreens(mapView) },
    { title: "Location", data: mapScreens(location) },
    { title: "Marker", data: mapScreens(marker) },
    { title: "Overlays", data: mapScreens(overlays) },
    { title: "Search", data: mapScreens(search) },
  ];

  render() {
    return (
      <SectionList
        style={style.body}
        renderItem={({ item }) => <ListItem title={item.title} route={item.key} />}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        sections={this.sections}
      />
    );
  }
}

export default {
  examples: { screen: Examples },
  ...mapView,
  ...location,
  ...marker,
  ...overlays,
  ...search,
};
