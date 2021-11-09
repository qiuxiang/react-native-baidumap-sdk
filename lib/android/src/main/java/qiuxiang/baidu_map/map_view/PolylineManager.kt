package qiuxiang.baidu_map.map_view

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.baidu_map.getEventTypeConstants
import qiuxiang.baidu_map.toLatLngList
import qiuxiang.baidu_map.toPx

@Suppress("unused")
internal class PolylineManager : SimpleViewManager<Polyline>() {
  override fun getName(): String {
    return "BaiduMapPolyline"
  }

  override fun createViewInstance(context: ThemedReactContext): Polyline {
    return Polyline(context)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants("onPress")
  }

  @ReactProp(name = "points")
  fun setPoints(polyline: Polyline, points: ReadableArray) {
    polyline.points = points.toLatLngList()
  }

  @ReactProp(name = "colors")
  fun setColors(polyline: Polyline, colors: ReadableArray) {
    polyline.colors = (0 until colors.size()).map { colors.getInt(it) }
  }

  @ReactProp(name = "color", customType = "Color")
  fun setColor(polyline: Polyline, color: Int) {
    polyline.color = color
  }

  @ReactProp(name = "width")
  fun setWidth(polyline: Polyline, width: Float) {
    polyline.width = width.toPx().toFloat()
  }

  @ReactProp(name = "zIndex")
  fun setIndex(polyline: Polyline, zIndex: Int) {
    polyline.zIndex = zIndex
  }

  @ReactProp(name = "geodesic")
  fun setGeodesic(polyline: Polyline, geodesic: Boolean) {
    polyline.geodesic = geodesic
  }

  @ReactProp(name = "dotted")
  fun setDashed(polyline: Polyline, dotted: Boolean) {
    polyline.dotted = dotted
  }

  @ReactProp(name = "gradient")
  fun setGradient(polyline: Polyline, gradient: Boolean) {
    polyline.gradient = gradient
  }
}
