package qiuxiang.baidu_map.map_view

import android.content.Context
import android.graphics.Color
import com.baidu.mapapi.map.BaiduMap
import com.baidu.mapapi.map.Polyline
import com.baidu.mapapi.map.PolylineOptions
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class Polyline(context: Context) : ReactViewGroup(context), Overlay {
  var polyline: Polyline? = null
  var gradient: Boolean = false
  var colors: List<Int> = emptyList()

  var points: List<LatLng> = emptyList()
    set(value) {
      field = value
      polyline?.points = value
    }

  var width: Float = 1f
    set(value) {
      field = value
      polyline?.width = value.toInt()
    }

  var color: Int = Color.BLACK
    set(value) {
      field = value
      polyline?.color = value
    }

  var zIndex: Int = 0
    set(value) {
      field = value
      polyline?.zIndex = value
    }

  var geodesic: Boolean = false
    set(value) {
      field = value
      polyline?.isGeodesic = value
    }

  var dotted: Boolean = false
    set(value) {
      field = value
      polyline?.isDottedLine = value
    }

  override fun add(map: BaiduMap) {
    polyline = map.addOverlay(
      PolylineOptions()
        .points(points)
        .color(color)
        .colorsValues(colors)
        .width(width.toInt())
        .isGradient(gradient)
        .isGeodesic(geodesic)
        .dottedLine(dotted)
        .zIndex(zIndex)
    ) as Polyline
  }

  override fun remove() {
    polyline?.remove()
  }
}
