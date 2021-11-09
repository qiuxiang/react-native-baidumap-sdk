package qiuxiang.baidu_map.map_view

import android.content.Context
import android.graphics.Color
import com.baidu.mapapi.map.BaiduMap
import com.baidu.mapapi.map.Polygon
import com.baidu.mapapi.map.PolygonOptions
import com.baidu.mapapi.map.Stroke
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class Polygon(context: Context) : ReactViewGroup(context), Overlay {
  private var polygon: Polygon? = null

  var points: List<LatLng> = emptyList()
    set(value) {
      field = value
      polygon?.points = value
    }

  var strokeWidth: Int = 1
    set(value) {
      field = value
      polygon?.stroke = Stroke(value, strokeColor)
    }

  var strokeColor: Int = Color.BLACK
    set(value) {
      field = value
      polygon?.stroke = Stroke(strokeWidth, value)
    }

  var fillColor: Int = Color.BLACK
    set(value) {
      field = value
      polygon?.fillColor = value
    }

  var zIndex: Int = 0
    set(value) {
      field = value
      polygon?.zIndex = value
    }

  override fun add(map: BaiduMap) {
    polygon = map.addOverlay(
      PolygonOptions()
        .points(points)
        .stroke(Stroke(strokeWidth, strokeColor))
        .fillColor(fillColor)
        .zIndex(zIndex)
    ) as Polygon
  }

  override fun remove() {
    polygon?.remove()
  }
}
