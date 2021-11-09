import * as React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { MapView } from "react-native-baidumap-sdk";
import styles from "../styles";

export default class extends React.Component {
  state = {
    compassEnabled: false,
    scaleControlsEnabled: true,
    zoomControlsEnabled: true,
  };

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          compassEnabled={this.state.compassEnabled}
          scaleControlsEnabled={this.state.scaleControlsEnabled}
          zoomControlsEnabled={this.state.zoomControlsEnabled}
          initialCameraPosition={{ bearing: 45, zoom: 15 }}
          style={styles.map}
        />
        <View style={styles.controls}>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(compassEnabled) => this.setState({ compassEnabled })}
              value={this.state.compassEnabled}
            />
            <Text>指南针</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(scaleControlsEnabled) => this.setState({ scaleControlsEnabled })}
              value={this.state.scaleControlsEnabled}
            />
            <Text>比例尺</Text>
          </View>
          <View style={styles.control}>
            <Switch
              style={styles.switch}
              onValueChange={(zoomControlsEnabled) => this.setState({ zoomControlsEnabled })}
              value={this.state.zoomControlsEnabled}
            />
            <Text>缩放按钮</Text>
          </View>
        </View>
      </View>
    );
  }
}
