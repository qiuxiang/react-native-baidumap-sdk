package qiuxiang.baidu_map.map_view

import android.content.Context
import com.baidu.mapapi.map.BaiduMap
import com.baidu.mapapi.map.HeatMap
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class HeatMap(context: Context) : ReactViewGroup(context), Overlay {
  private var overlay: HeatMap? = null
  var data: List<LatLng> = emptyList()
  var opacity: Double = 0.6
  var radius: Int = 12

  override fun add(map: BaiduMap) {
    overlay = HeatMap.Builder().data(data).radius(radius).opacity(opacity).build()
    map.addHeatMap(overlay)
  }

  override fun remove() {
    overlay?.removeHeatMap()
  }
}