package cn.qiuxiang.react.baidumap.mapview

import cn.qiuxiang.react.baidumap.toLatLngList
import cn.qiuxiang.react.baidumap.toPx
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapPolygonManager : SimpleViewManager<BaiduMapPolygon>() {
    override fun getName(): String {
        return "BaiduMapPolygon"
    }

    override fun createViewInstance(context: ThemedReactContext): BaiduMapPolygon {
        return BaiduMapPolygon(context)
    }

    @ReactProp(name = "points")
    fun setPoints(polygon: BaiduMapPolygon, points: ReadableArray) {
        polygon.setPoints(points.toLatLngList())
    }

    @ReactProp(name = "fillColor", customType = "Color")
    fun setFillColor(polygon: BaiduMapPolygon, fillColor: Int) {
        polygon.setFillColor(fillColor)
    }

    @ReactProp(name = "strokeColor", customType = "Color")
    fun setStrokeColor(polygon: BaiduMapPolygon, strokeColor: Int) {
        polygon.strokeColor = strokeColor
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(polygon: BaiduMapPolygon, strokeWidth: Float) {
        polygon.strokeWidth = strokeWidth.toPx()
    }
}
