import {
  ColorPropType,
  requireNativeComponent,
  ViewPropTypes
} from "react-native";
import { number, arrayOf } from "prop-types";
import { LatLngPropType } from "../prop-types";

// @ts-ignore
export default requireNativeComponent("BaiduMapPolygon", {
  propTypes: {
    ...ViewPropTypes,
    points: arrayOf(LatLngPropType).isRequired,
    strokeWidth: number,
    strokeColor: ColorPropType,
    fillColor: ColorPropType
  }
});
