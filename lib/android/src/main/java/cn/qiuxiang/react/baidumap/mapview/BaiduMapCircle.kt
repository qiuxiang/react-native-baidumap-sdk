package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.graphics.Color
import cn.qiuxiang.react.baidumap.toPx
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapCircle(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private var polygon: Circle? = null
    private val options = CircleOptions()

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

    fun setCenter(center: LatLng) {
        options.center(center)
        polygon?.center = center
    }

    fun setRadius(radius: Int) {
        options.radius(radius)
        polygon?.radius = radius
    }

    override fun addTo(mapView: BaiduMapView) {
        options.stroke(Stroke(strokeWidth, strokeColor))
        polygon = mapView.map.addOverlay(options) as Circle
    }

    override fun remove() {
        polygon?.remove()
    }
}
