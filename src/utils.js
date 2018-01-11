// @flow
import { NativeModules } from 'react-native'
import { LatLng } from './prop-types'

const { BaiduMapUtils } = NativeModules

export default {
  getDistance: (point1: LatLng, point2: LatLng): Promise<number> =>
    BaiduMapUtils.getDistance(point1, point2),

  getNearestPointFromPolyine: (point: LatLng, points: LatLng[]): Promise<LatLng> =>
    BaiduMapUtils.getNearestPointFromPolyine(point, points),

  isPolygonContainsPoint: (point: LatLng, points: LatLng[]): Promise<boolean> =>
    BaiduMapUtils.isPolygonContainsPoint(point, points),

  isCircleContainsPoint: (point: LatLng, center: LatLng, radius: number): Promise<boolean> =>
    BaiduMapUtils.isCircleContainsPoint(point, center, radius),
}
