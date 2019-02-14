export type Point = {
  x: number,
  y: number,
}

export type LatLng = {
  latitude: number,
  longitude: number,
}

export type Region = {
  latitudeDelta: number,
  longitudeDelta: number,
} & LatLng

export type MapStatus = {
  center: LatLng,
  region: Region,
  overlook: number,
  rotation: number,
  zoomLevel: number,
}

export type Location = {
  accuracy?: number,
  latitude: number,
  longitude: number,
  direction: number,
}
