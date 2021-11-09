package qiuxiang.baidu_map.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.baidu_map.toLatLngList
import qiuxiang.baidu_map.toPx

@Suppress("unused")
internal class PolygonManager : SimpleViewManager<Polygon>() {
  override fun getName(): String {
    return "BaiduMapPolygon"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): Polygon {
    return Polygon(reactContext)
  }

  @ReactProp(name = "points")
  fun setPoints(polygon: Polygon, points: ReadableArray) {
    polygon.points = points.toLatLngList()
  }

  @ReactProp(name = "fillColor", customType = "Color")
  fun setFillColor(polygon: Polygon, fillColor: Int) {
    polygon.fillColor = fillColor
  }

  @ReactProp(name = "strokeColor", customType = "Color")
  fun setStrokeColor(polygon: Polygon, strokeColor: Int) {
    polygon.strokeColor = strokeColor
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(polygon: Polygon, strokeWidth: Int) {
    polygon.strokeWidth = strokeWidth.toPx()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(polygon: Polygon, zIndex: Int) {
    polygon.zIndex = zIndex
  }
}
