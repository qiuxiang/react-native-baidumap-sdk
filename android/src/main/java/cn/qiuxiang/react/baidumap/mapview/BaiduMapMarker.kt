package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.os.Bundle
import android.widget.ImageView
import cn.qiuxiang.react.baidumap.R
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapMarker(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private val options = MarkerOptions()
    private var marker: Marker? = null
    private val imageView = ImageView(context)

    init {
        imageView.setImageResource(R.drawable.marker)
        setColor(0xfff5533d.toInt())
    }

    fun setPosition(position: LatLng) {
        marker?.position = position
        options.position(position)
    }

    fun setTitle(title: String) {
        marker?.title = title
        options.title(title)
    }

    private fun setIcon(icon: BitmapDescriptor) {
        options.icon(icon)
        marker?.icon = icon
    }

    fun setColor(color: Int) {
        imageView.setColorFilter(color, android.graphics.PorterDuff.Mode.MULTIPLY)
        setIcon(BitmapDescriptorFactory.fromView(imageView))
    }

    fun setImage(image: String) {
        val drawable = context.resources.getIdentifier(image, "drawable", context.packageName)
        setIcon(BitmapDescriptorFactory.fromResource(drawable))
    }

    override fun addTo(map: BaiduMap) {
        marker = map.addOverlay(options) as Marker

        val bundle = Bundle()
        bundle.putInt("id", id)
        marker?.extraInfo = bundle
    }

    override fun remove() {
        marker?.remove()
    }
}
