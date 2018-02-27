package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import com.baidu.mapapi.map.Polyline
import com.baidu.mapapi.map.PolylineOptions
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapPolyline(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private var polyline: Polyline? = null
    private val options = PolylineOptions()

    fun setLineColor(color: Int) {
        options.color(color)
        polyline?.color = color
    }

    fun setLineWidth(width: Int) {
        options.width(width)
        polyline?.width = width
    }

    fun setPoints(points: List<LatLng>) {
        options.points(points)
        polyline?.points = points
    }

    override fun addTo(mapView: BaiduMapView) {
        polyline = mapView.map.addOverlay(options) as Polyline
    }

    override fun remove() {
        polyline?.remove()
    }
}
