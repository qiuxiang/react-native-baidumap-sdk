import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Touchable from "@react-navigation/stack/lib/module/views/TouchableItem";

const style = StyleSheet.create({
  container: {
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ({ onPress, source, color }) => {
  const tintColor = color || "#fff";
  return (
    <Touchable onPress={onPress} borderless>
      <View style={style.container}>
        <Image style={[style.icon, { tintColor }]} source={source} />
      </View>
    </Touchable>
  );
};
