import React from "react";
import { Switch } from "react-native";

export default props => (
  <Switch
    trackColor="rgba(245,83,61,0.5)"
    thumbColor={props.value ? "#f5533d" : "#f5f5f5"}
    {...props}
  />
);
