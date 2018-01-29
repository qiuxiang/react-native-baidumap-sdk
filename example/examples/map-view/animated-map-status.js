import MapStatus from './map-status'

export default class AnimatedMapStatus extends MapStatus {
  static navigationOptions = { title: 'Animated map status' }

  toZGC = () => this.mapView.setStatus(this.ZGC, 2000)
  toTAM = () => this.mapView.setStatus(this.TAM, 2000)
}
