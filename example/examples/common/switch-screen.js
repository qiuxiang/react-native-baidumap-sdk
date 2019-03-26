import React, { Component } from "react";
import { StyleSheet } from "react-native";
import EventEmitter from "EventEmitter";
import Switch from "./switch";

const event = new EventEmitter();

const style = StyleSheet.create({
  switch: {
    marginRight: 16
  }
});

class SwitchButton extends Component {
  state = { value: true };

  onValueChange = () => {
    event.emit("change", !this.state.value);
    this.setState({ value: !this.state.value });
  };

  render() {
    return (
      <Switch
        style={style.switch}
        value={this.state.value}
        onValueChange={this.onValueChange}
      />
    );
  }
}

export default class SwitchScreen extends Component {
  static navigationOptions = {
    headerRight: <SwitchButton />
  };

  componentWillUnmount() {
    this.listener.remove();
  }

  listener = event.addListener("change", value => this.onSwitch(value));
}
