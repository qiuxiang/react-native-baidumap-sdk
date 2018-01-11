import MapStatus from './map-status'

export default class AnimatedMapStatus extends MapStatus {
  static navigationOptions = {
    title: 'Animated map status',
  }

  toZGC = () => this.mapView.animateTo({ ...this.ZGC, coordinate: this.ZGC.center }, 2000)
  toTAM = () => this.mapView.animateTo({ ...this.TAM, coordinate: this.TAM.center }, 2000)
}
