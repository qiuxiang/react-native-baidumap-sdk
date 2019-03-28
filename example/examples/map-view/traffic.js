import React from "react";
import { StyleSheet } from "react-native";
import { MapView } from "../../../src/index";
import { SwitchScreen } from "../common";

export default class Traffic extends SwitchScreen {
  static navigationOptions = {
    ...SwitchScreen.navigationOptions,
    title: "Traffic layer"
  };

  state = { trafficEnabled: true };

  onSwitch(trafficEnabled) {
    this.setState({ trafficEnabled });
  }

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFill}
        trafficEnabled={this.state.trafficEnabled}
      />
    );
  }
}
