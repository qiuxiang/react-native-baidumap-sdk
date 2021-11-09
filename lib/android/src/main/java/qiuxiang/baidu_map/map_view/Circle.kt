package qiuxiang.baidu_map.map_view

import android.content.Context
import android.graphics.Color
import com.baidu.mapapi.map.BaiduMap
import com.baidu.mapapi.map.Circle
import com.baidu.mapapi.map.CircleOptions
import com.baidu.mapapi.map.Stroke
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class Circle(context: Context) : ReactViewGroup(context), Overlay {
  private var circle: Circle? = null

  var center: LatLng? = null
    set(value) {
      field = value
      circle?.center = value
    }

  var radius: Int = 0
    set(value) {
      field = value
      circle?.radius = value
    }

  var strokeWidth: Int = 1
    set(value) {
      field = value
      circle?.stroke = Stroke(value, strokeColor)
    }

  var strokeColor: Int = Color.BLACK
    set(value) {
      field = value
      circle?.stroke = Stroke(strokeWidth, value)
    }

  var fillColor: Int = Color.BLACK
    set(value) {
      field = value
      circle?.fillColor = value
    }

  var zIndex: Int = 0
    set(value) {
      field = value
      circle?.zIndex = value
    }

  override fun add(map: BaiduMap) {
    circle = map.addOverlay(
      CircleOptions()
        .center(center)
        .radius(radius)
        .stroke(Stroke(strokeWidth, strokeColor))
        .fillColor(fillColor)
        .zIndex(zIndex)
    ) as Circle
  }

  override fun remove() {
    circle?.remove()
  }
}
