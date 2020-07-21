import * as React from "react";
import { bool, string } from "prop-types";
import {
  ColorPropType,
  Platform,
  requireNativeComponent,
  StyleSheet,
  View,
  ViewProps,
  ViewPropTypes
} from "react-native";
import {
  LatLngPropType,
  PointPropType,
  mapEventsPropType
} from "../prop-types";
import Component from "../component";
import { LatLng, Point } from "../types";

const style = StyleSheet.create({
  marker: {
    position: "absolute"
  }
});

type Props = {
  coordinate: LatLng;
  color?: string;
  image?: string;
  view?: React.ComponentType<any>;
  title?: string;
  selected?: boolean;
  draggable?: boolean;
  flat?: boolean;
  centerOffset?: Point;
  onPress?: () => void;
  onCalloutPress?: () => void;
  onDrag?: (coordinate: LatLng) => void;
  onDragStart?: (coordinate: LatLng) => void;
  onDragEnd?: (coordinate: LatLng) => void;
} & ViewProps;

const events = [
  "onPress",
  "onCalloutPress",
  "onDrag",
  "onDragStart",
  "onDragEnd"
];

export default class Marker extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    coordinate: LatLngPropType.isRequired,
    color: ColorPropType,
    image: string,
    title: string,
    selected: bool,
    draggable: bool,
    flat: bool,
    centerOffset: PointPropType
  };

  componentDidUpdate() {
    if (this.props.view && Platform.OS === "android") {
      this.update();
    }
  }

  nativeComponent = "BaiduMapMarker";

  select() {
    this.call("select");
  }

  update() {
    this.call("update");
  }

  renderMarkerView() {
    if (this.props.view) {
      // @ts-ignore
      const markerView = <this.props.view />;
      return (
        <View style={style.marker} key="marker">
          {markerView}
        </View>
      );
    }
    return null;
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers(events),
      children: [this.props.children, this.renderMarkerView()]
    };
    return <BaiduMapMarker {...props} />;
  }
}

// @ts-ignore
const BaiduMapMarker = requireNativeComponent("BaiduMapMarker", Marker);
