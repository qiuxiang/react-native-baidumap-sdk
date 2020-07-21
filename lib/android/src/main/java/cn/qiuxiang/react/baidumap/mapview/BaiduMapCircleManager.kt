package cn.qiuxiang.react.baidumap.mapview

import cn.qiuxiang.react.baidumap.toLatLng
import cn.qiuxiang.react.baidumap.toPx
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapCircleManager : SimpleViewManager<BaiduMapCircle>() {
    override fun getName(): String {
        return "BaiduMapCircle"
    }

    override fun createViewInstance(context: ThemedReactContext): BaiduMapCircle {
        return BaiduMapCircle(context)
    }

    @ReactProp(name = "center")
    fun setCenter(circle: BaiduMapCircle, center: ReadableMap) {
        circle.setCenter(center.toLatLng())
    }

    @ReactProp(name = "radius")
    fun setRadius(circle: BaiduMapCircle, radius: Int) {
        circle.setRadius(radius)
    }

    @ReactProp(name = "fillColor", customType = "Color")
    fun setFillColor(circle: BaiduMapCircle, fillColor: Int) {
        circle.setFillColor(fillColor)
    }

    @ReactProp(name = "strokeColor", customType = "Color")
    fun setStrokeColor(circle: BaiduMapCircle, strokeColor: Int) {
        circle.strokeColor = strokeColor
    }

    @ReactProp(name = "strokeWidth")
    fun setStrokeWidth(circle: BaiduMapCircle, strokeWidth: Float) {
        circle.strokeWidth = strokeWidth.toPx()
    }
}
