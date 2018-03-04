package cn.qiuxiang.react.baidumap.mapview

import cn.qiuxiang.react.baidumap.toLatLngList
import cn.qiuxiang.react.baidumap.toPx
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapPolylineManager : SimpleViewManager<BaiduMapPolyline>() {
    override fun getName(): String {
        return "BaiduMapPolyline"
    }

    override fun createViewInstance(context: ThemedReactContext): BaiduMapPolyline {
        return BaiduMapPolyline(context)
    }

    @ReactProp(name = "points")
    fun setPoints(polyline: BaiduMapPolyline, points: ReadableArray) {
        polyline.setPoints(points.toLatLngList())
    }

    @ReactProp(name = "color", customType = "Color")
    fun setColor(polyline: BaiduMapPolyline, color: Int) {
        polyline.setLineColor(color)
    }

    @ReactProp(name = "width")
    fun setWidth(polyline: BaiduMapPolyline, width: Float) {
        polyline.setLineWidth(width.toPx())
    }
}
