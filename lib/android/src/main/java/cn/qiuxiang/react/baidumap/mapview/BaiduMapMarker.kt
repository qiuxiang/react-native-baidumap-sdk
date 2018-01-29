package cn.qiuxiang.react.baidumap.mapview

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.view.View
import android.widget.Button
import android.widget.ImageView
import cn.qiuxiang.react.baidumap.R
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapMarker(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private val options = MarkerOptions()
    private var iconHeight = 0
    private val imageView = ImageView(context)
    private var markerView: View? = null
    private var callout: BaiduMapCallout? = null
    private var infoWindow: InfoWindow? = null
    private var mapView: BaiduMapView? = null

    var marker: Marker? = null

    init {
        imageView.setImageResource(R.drawable.marker)
        setColor(0xfff5533d.toInt())
        iconHeight = imageView.height
    }

    var active: Boolean = false
        set(value) {
            if (field && !value) {
                mapView?.map?.hideInfoWindow()
            }
            if (value) {
                showInfoWindow()
            }
            field = value
        }

    fun setPosition(position: LatLng) {
        options.position(position)
        marker?.let {
            it.position = position
            active = active
        }
    }

    fun setTitle(title: String) {
        options.title(title)
        marker?.title = title
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

    fun setFlat(flat: Boolean) {
        options.flat(flat)
        marker?.isFlat = flat
    }

    fun setMarkerView(view: View) {
        markerView = view
        view.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            updateMarkerView()
        }
    }

    fun updateMarkerView() {
        markerView?.let {
            iconHeight = it.height
            marker?.icon = bitmapDescriptorFrom(it)
        }
    }

    fun setInfoWindow(callout: BaiduMapCallout) {
        this.callout = callout
        callout.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            handler.postDelayed({ active = active }, 500)
        }
    }

    private fun showInfoWindow() {
        updateCustomInfoWindow()
        updateDefaultInfoWindow()
        mapView?.map?.showInfoWindow(infoWindow)
    }

    @SuppressLint("SetTextI18n")
    private fun updateDefaultInfoWindow() {
        if (marker?.title != null && this.callout == null) {
            val callout = Button(context)
            callout.text = " " + marker?.title + " "
            callout.transformationMethod = null
            callout.setBackgroundResource(R.drawable.callout)
            val bitmapDescriptor = BitmapDescriptorFactory.fromView(callout)
            infoWindow = InfoWindow(bitmapDescriptor, marker?.position, -iconHeight, {
                mapView?.emit(id, "topCalloutPress")
            })
        }
    }

    private fun updateCustomInfoWindow() {
        callout?.let {
            if (it.width > 0 && it.height > 0) {
                infoWindow = InfoWindow(bitmapDescriptorFrom(it), marker?.position, -iconHeight, {
                    mapView?.emit(it.id, "topPress")
                    mapView?.emit(id, "topCalloutPress")
                })
            }
        }
    }

    private fun bitmapDescriptorFrom(view: View): BitmapDescriptor {
        val bitmap = Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
        view.draw(Canvas(bitmap))
        return BitmapDescriptorFactory.fromBitmap(bitmap)
    }

    override fun addTo(mapView: BaiduMapView) {
        this.mapView = mapView
        marker = mapView.map.addOverlay(options) as Marker
        active = active
    }

    override fun remove() {
        active = false
        marker?.remove()
    }
}
