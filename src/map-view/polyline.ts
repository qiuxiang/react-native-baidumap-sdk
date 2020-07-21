import {
  ColorPropType,
  requireNativeComponent,
  ViewPropTypes
} from "react-native";
import { number, arrayOf } from "prop-types";
import { LatLngPropType } from "../prop-types";

// @ts-ignore
export default requireNativeComponent("BaiduMapPolyline", {
  propTypes: {
    ...ViewPropTypes,
    points: arrayOf(LatLngPropType).isRequired,
    width: number,
    color: ColorPropType,
    colors: arrayOf(ColorPropType)
  }
});
