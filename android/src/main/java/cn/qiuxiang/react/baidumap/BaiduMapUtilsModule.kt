package cn.qiuxiang.react.baidumap

import com.baidu.mapapi.utils.DistanceUtil
import com.baidu.mapapi.utils.SpatialRelationUtil.*
import com.facebook.react.bridge.*

@Suppress("unused")
class BaiduMapUtilsModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "BaiduMapUtils"
    }

    @ReactMethod
    fun getDistance(point1: ReadableMap, point2: ReadableMap, promise: Promise) {
        promise.resolve(DistanceUtil.getDistance(point1.toLatLng(), point2.toLatLng()))
    }

    @ReactMethod
    fun getNearestPointFromPolyine(point: ReadableMap, points: ReadableArray, promise: Promise) {
        val result = getNearestPointFromLine(points.toLatLngList(), point.toLatLng())
        promise.resolve(result.toWritableMap())
    }

    @ReactMethod
    fun isPolygonContainsPoint(point: ReadableMap, points: ReadableArray, promise: Promise) {
        promise.resolve(isPolygonContainsPoint(points.toLatLngList(), point.toLatLng()))
    }

    @ReactMethod
    fun isCircleContainsPoint(point: ReadableMap, center: ReadableMap, radius: Int, promise: Promise) {
        promise.resolve(isCircleContainsPoint(center.toLatLng(), radius, point.toLatLng()))
    }
}
