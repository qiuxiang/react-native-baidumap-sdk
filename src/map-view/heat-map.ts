import { requireNativeComponent, ViewPropTypes } from "react-native";
import { number, shape, arrayOf } from "prop-types";

// @ts-ignore
export default requireNativeComponent("BaiduMapHeatMap", {
  propTypes: {
    ...ViewPropTypes,
    points: arrayOf(
      shape({
        latitude: number.isRequired,
        longitude: number.isRequired,
        intensity: number
      })
    ).isRequired,
    radius: number,
    opacity: number
  }
});
