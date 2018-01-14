package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Bundle
import android.widget.ImageView
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup
import cn.qiuxiang.react.baidumap.R

class BaiduMapMarker(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private val options = MarkerOptions()
    private var marker: Marker? = null
    private val imageView = ImageView(context)
    private var callout: BaiduMapCallout? = null
    private var infoWindow: InfoWindow? = null
    private var mapView: BaiduMapView? = null

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

    private fun updateInfoWindow() {
        callout?.let {
            val bitmap = Bitmap.createBitmap(it.width, it.height, Bitmap.Config.ARGB_8888)
            it.draw(Canvas(bitmap))
            val bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
            infoWindow = InfoWindow(bitmapDescriptor, marker?.position, -imageView.height, {
                mapView?.emit(it.id, "onPress")
            })
        }
    }

    fun setInfoWindow(callout: BaiduMapCallout) {
        this.callout = callout
        callout.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            updateInfoWindow()
            android.os.Handler().postDelayed({ updateInfoWindow() }, 200)
        }
    }

    fun select() {
        updateInfoWindow()
        mapView?.map?.showInfoWindow(infoWindow)
        mapView?.map?.animateMapStatus(MapStatusUpdateFactory.newLatLng(marker?.position))
    }

    override fun addTo(mapView: BaiduMapView) {
        this.mapView = mapView
        marker = mapView.map.addOverlay(options) as Marker

        val bundle = Bundle()
        bundle.putInt("id", id)
        marker?.extraInfo = bundle
    }

    override fun remove() {
        marker?.remove()
    }
}
