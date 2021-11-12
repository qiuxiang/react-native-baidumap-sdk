import { useNavigation, useTheme } from "@react-navigation/native";
import * as React from "react";
import {
  Constructor,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { BaiduMapSdk } from "react-native-baidumap-sdk";
import screens from "./screens";
import { NavigationProps, ScreenName } from "./types";

let Touchable: Constructor<any> = TouchableOpacity;
if (Platform.OS === "android") {
  Touchable = TouchableNativeFeedback;
}

export default () => {
  React.useEffect(() => {
    BaiduMapSdk.init(
      Platform.select({
        android: "4x5T0eO4Koe4vtexjRdGLuRr1sOhu2YA",
        ios: "6iBF0QeqRm9xCGozsVWQTUI8OPwVmhTD",
      })
    );
  }, []);
  return (
    <ScrollView>
      {Object.keys(screens).map((i) => (
        <Item key={i} name={i as keyof typeof screens} />
      ))}
    </ScrollView>
  );
};

function Item({ name }: { name: ScreenName }) {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProps>();
  return (
    <Touchable onPress={() => navigation.push(name)}>
      <View style={style.item}>
        <Text style={[style.itemText, { color: colors.text }]}>{name}</Text>
      </View>
    </Touchable>
  );
}

const style = StyleSheet.create({
  item: { padding: 16 },
  itemText: { fontSize: 16 },
});
