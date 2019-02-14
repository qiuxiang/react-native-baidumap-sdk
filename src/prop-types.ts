import { number, shape, func } from "prop-types";

export const LatLngPropType = shape({
  latitude: number.isRequired,
  longitude: number.isRequired
});

export const RegionPropType = shape({
  latitude: number.isRequired,
  longitude: number.isRequired,
  latitudeDelta: number.isRequired,
  longitudeDelta: number.isRequired
});

export const PointPropType = shape({
  x: number.isRequired,
  y: number.isRequired
});

export const LocationPropType = shape({
  accuracy: number,
  direction: number,
  latitude: number.isRequired,
  longitude: number.isRequired
});

export function mapEventsPropType(events) {
  return events.reduce((props, event) => {
    props[event.replace(/^on/, "onBaiduMap")] = func;
    return props;
  }, {});
}
