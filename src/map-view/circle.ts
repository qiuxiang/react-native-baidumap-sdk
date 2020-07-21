import {
  ColorPropType,
  requireNativeComponent,
  ViewPropTypes
} from "react-native";
import { number } from "prop-types";
import { LatLngPropType } from "../prop-types";

// @ts-ignore
export default requireNativeComponent("BaiduMapCircle", {
  propTypes: {
    ...ViewPropTypes,
    center: LatLngPropType.isRequired,
    radius: number,
    strokeWidth: number,
    strokeColor: ColorPropType,
    fillColor: ColorPropType
  }
});
