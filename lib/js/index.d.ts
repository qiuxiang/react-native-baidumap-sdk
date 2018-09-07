import { Component, ComponentType } from "react";
import { ViewProps, ColorPropType } from "react-native";

export type Point = {
  x: number;
  y: number;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Region = {
  latitudeDelta: number;
  longitudeDelta: number;
} & LatLng;

export type MapStatus = {
  center: LatLng;
  region: Region;
  overlook: number;
  rotation: number;
  zoomLevel: number;
};

export type MapViewStatus = {
  center?: LatLng;
  point?: Point;
  region?: Region;
  overlook?: number;
  rotation?: number;
  zoomLevel?: number;
};

export type Location = {
  accuracy?: number;
  latitude: number;
  longitude: number;
  direction: number;
};

export interface MarkerProps extends ViewProps {
  coordinate: LatLng;
  color?: string;
  image?: string;
  view?: JSX.Element;
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
}

export class Marker extends Component<MarkerProps> {
  select(): void;
  update(): void;
}

export interface MapViewProps extends ViewProps {
  satellite?: boolean;
  trafficEnabled?: boolean;
  baiduHeatMapEnabled?: boolean;
  indoorEnabled?: boolean;
  buildingsDisabled?: boolean;
  minZoomLevel?: number;
  maxZoomLevel?: number;
  compassDisabled?: boolean;
  zoomControlsDisabled?: boolean;
  scaleBarDisabled?: boolean;
  scrollDisabled?: boolean;
  overlookDisabled?: boolean;
  rotateDisabled?: boolean;
  zoomDisalbed?: boolean;
  center?: LatLng;
  zoomLevel?: number;
  rotation?: number;
  overlook?: number;
  paused?: boolean;
  locationEnabled?: boolean;
  location?: Location;
  locationMode?: "normal" | "follow" | "compass";
  campassMode?: true;
  onLoad?: () => void;
  onClick?: (latlng: LatLng) => void;
  onLongClick?: (latlng: LatLng) => void;
  onDoubleClick?: (latlng: LatLng) => void;
  onStatusChange?: (mapStatus: MapStatus) => void;
}

export class MapView extends Component<MapViewProps> {
  static Marker: typeof Marker;
  setStatus(status: MapViewStatus, duration?: number): void;
}
