import { Component, ReactElement } from "react";
import { ViewProps, ViewStyle } from "react-native";

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
  view?: () => ReactElement<any>;
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

export interface PolylineProps extends ViewProps {
  points: LatLng[];
  color?: string;
  colors?: string;
  width?: number;
}

export class Polyline extends Component<PolylineProps> {}

export interface PolygonProps extends ViewProps {
  points: LatLng[];
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export class Polygon extends Component<PolygonProps> {}

export interface CircleProps extends ViewProps {
  center: LatLng;
  radius: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export class Circle extends Component<CircleProps> {}

export type HeatMapPoint = { intensity: number } & LatLng;

export interface HeatMapProps extends ViewProps {
  points: HeatMapPoint[];
  radius?: number;
  opacity?: number;
}

export class HeatMap extends Component<HeatMapProps> {}

export type ClusterParams = {
  id: number;
  count: number;
  coordinate: LatLng;
};

export type ClusterMarkerItem = {
  coordinate: LatLng;
  extra?: any;
};

export interface ClusterProps extends ViewProps {
  markers: ClusterMarkerItem[];
  renderMarker: (ClusterMarkerItem) => ReactElement<any>;
  radius?: number;
  clusterStyle?: ViewStyle;
  clusterTextStyle?: ViewStyle;
  renderCluster?: (ClusterParams) => ReactElement<any>;
  onPress?: (ClusterParams) => void;
}

export class Cluster extends Component<ClusterProps> {
  update({ zoomLevel: number, region: Region }): void;
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
  static Polyline: typeof Polyline;
  static Polygon: typeof Polygon;
  static HeatMap: typeof HeatMap;
  static Cluster: typeof Cluster;
  setStatus(status: MapViewStatus, duration?: number): void;
}
