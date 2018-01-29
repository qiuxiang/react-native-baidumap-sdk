package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import com.baidu.mapapi.map.Text
import com.baidu.mapapi.map.TextOptions
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapText(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private var text: Text? = null
    private val options = TextOptions()

    fun setCoordinate(coordinate: LatLng) {
        options.position(coordinate)
        text?.position = coordinate
    }

    fun setContent(content: String) {
        options.text(content)
        text?.text = content
    }

    fun setFontSize(size: Int) {
        options.fontSize(size)
        text?.fontSize = size
    }

    fun setRotate(rotation: Float) {
        options.rotate(rotation)
        text?.rotate = rotation
    }

    fun setColor(color: Int) {
        options.fontColor(color)
        text?.fontColor = color
    }

    fun setBgColor(color: Int) {
        options.bgColor(color)
        text?.bgColor = color
    }

    override fun addTo(mapView: BaiduMapView) {
        text = mapView.map.addOverlay(options) as Text
    }

    override fun remove() {
        text?.remove()
    }
}
