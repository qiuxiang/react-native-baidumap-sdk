import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MapType, MapView } from "react-native-baidumap-sdk";

export default () => {
  const [mapType, setMapType] = useState(MapType.Standard);
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView style={{ flex: 1 }} mapType={mapType} />
      <Picker
        style={{ backgroundColor: "#fff", color: "#000" }}
        selectedValue={mapType}
        onValueChange={setMapType}
      >
        <Picker.Item label="标准" value={MapType.Standard} />
        <Picker.Item label="卫星" value={MapType.Satellite} />
        <Picker.Item label="空白" value={MapType.None} />
      </Picker>
    </View>
  );
};
