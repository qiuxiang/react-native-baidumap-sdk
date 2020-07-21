import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Initializer } from "react-native-baidumap-sdk";
import examples from "./examples";

const Stack = createStackNavigator();
Initializer.init("6s1BDd7jUHhzUV8S8E3kMEyAKfqkKPrw");

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      {Object.keys(examples).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          component={examples[name].screen}
          options={examples[name].options}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);
