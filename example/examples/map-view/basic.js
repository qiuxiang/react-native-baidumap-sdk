import React from "react";
import { StyleSheet } from "react-native";
import { MapView } from "react-native-baidumap-sdk";

const Screen = () => {
  return <MapView style={StyleSheet.absoluteFill} />;
};

Screen.title = "Basic usage";

export default Screen;
