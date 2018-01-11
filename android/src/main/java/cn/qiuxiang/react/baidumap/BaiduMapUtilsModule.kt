package cn.qiuxiang.react.baidumap

import com.baidu.mapapi.utils.DistanceUtil
import com.baidu.mapapi.utils.SpatialRelationUtil
import com.facebook.react.bridge.*

@Suppress("unused")
class BaiduMapUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BaiduMapUtils"
    }

    @ReactMethod
    fun getDistance(point1: ReadableMap, point2: ReadableMap, promise: Promise) {
        promise.resolve(DistanceUtil.getDistance(point1.toLatLng(), point2.toLatLng()))
    }

    @ReactMethod
    fun getNearestPointFromPolyine(point: ReadableMap, points: ReadableArray, promise: Promise) {
        val result = SpatialRelationUtil.getNearestPointFromLine(
            points.toLatLngList(), point.toLatLng())
        promise.resolve(createWritableMapFromLatLng(result))
    }

    @ReactMethod
    fun isPolygonContainsPoint(point: ReadableMap, points: ReadableArray, promise: Promise) {
        promise.resolve(SpatialRelationUtil.isPolygonContainsPoint(
            points.toLatLngList(), point.toLatLng()))
    }

    @ReactMethod
    fun isCircleContainsPoint(point: ReadableMap, center: ReadableMap, radius: Int, promise: Promise) {
        promise.resolve(SpatialRelationUtil.isCircleContainsPoint(
            center.toLatLng(), radius, point.toLatLng()))
    }
}
