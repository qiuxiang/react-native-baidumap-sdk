package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.graphics.Color
import cn.qiuxiang.react.baidumap.toPx
import com.baidu.mapapi.map.Polygon
import com.baidu.mapapi.map.PolygonOptions
import com.baidu.mapapi.map.Stroke
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapPolygon(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private var polygon: Polygon? = null
    private val options = PolygonOptions()

    var strokeColor: Int = Color.BLACK
        set(value) {
            field = value
            polygon?.let { it.stroke = Stroke(it.stroke.strokeWidth, value) }
        }

    var strokeWidth: Int = 1f.toPx()
        set(value) {
            field = value
            polygon?.let { it.stroke = Stroke(value, it.stroke.color) }
        }

    fun setFillColor(color: Int) {
        options.fillColor(color)
        polygon?.fillColor = color
    }

    fun setPoints(points: List<LatLng>) {
        options.points(points)
        polygon?.points = points
    }

    override fun addTo(mapView: BaiduMapView) {
        options.stroke(Stroke(strokeWidth, strokeColor))
        polygon = mapView.map.addOverlay(options) as Polygon
    }

    override fun remove() {
        polygon?.remove()
    }
}
