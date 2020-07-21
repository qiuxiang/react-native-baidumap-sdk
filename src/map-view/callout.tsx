import * as React from "react";
import {
  requireNativeComponent,
  StyleSheet,
  ViewProps,
  ViewPropTypes
} from "react-native";
import Component from "../component";

const style = StyleSheet.create({
  callout: {
    position: "absolute"
  }
});

type Props = { onPress: () => {} } & ViewProps;

export default class Callout extends Component<Props> {
  static propTypes = ViewPropTypes;

  nativeComponent = "BaiduMapCallout";

  render() {
    const props = {
      ...this.props,
      ...this.handlers(["onPress"]),
      style: [style.callout, this.props.style]
    };
    return <BaiduMapCallout {...props} />;
  }
}

// @ts-ignore
const BaiduMapCallout = requireNativeComponent("BaiduMapCallout", Callout);
