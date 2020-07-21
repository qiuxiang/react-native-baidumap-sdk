package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import cn.qiuxiang.react.baidumap.toLatLng
import com.baidu.mapapi.map.HeatMap
import com.baidu.mapapi.map.WeightedLatLng
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapHeatMap(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private var heatMap: HeatMap? = null
    private var points: Collection<WeightedLatLng>? = null
    var opacity: Double = 0.6
    var radius: Int = 12

    fun setPoints(points: ReadableArray) {
        this.points = (0 until points.size())
                .map { points.getMap(it) }
                .map {
                    val intensity = if (it!!.hasKey("intensity")) it.getDouble("intensity") else 0.0
                    WeightedLatLng(it.toLatLng(), intensity)
                }
    }

    override fun addTo(mapView: BaiduMapView) {
        mapView.map.addHeatMap(HeatMap.Builder()
                .opacity(opacity)
                .radius(radius)
                .weightedData(points)
                .build())
    }

    override fun remove() {
        heatMap?.removeHeatMap()
    }
}
