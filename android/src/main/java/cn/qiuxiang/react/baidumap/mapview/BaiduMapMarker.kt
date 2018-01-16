package cn.qiuxiang.react.baidumap.mapview

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.widget.Button
import android.widget.ImageView
import cn.qiuxiang.react.baidumap.R
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.views.view.ReactViewGroup

class BaiduMapMarker(context: Context) : ReactViewGroup(context), BaiduMapOverlay {
    private val options = MarkerOptions()
    private val imageView = ImageView(context)
    private var callout: BaiduMapCallout? = null
    private var infoWindow: InfoWindow? = null
    private var mapView: BaiduMapView? = null

    var marker: Marker? = null

    init {
        imageView.setImageResource(R.drawable.marker)
        setColor(0xfff5533d.toInt())
    }

    var active: Boolean = false
        set(value) {
            if (field && !value) {
                mapView?.map?.hideInfoWindow()
            }
            if (value) {
                select()
            }
            field = value
        }

    fun setPosition(position: LatLng) {
        options.position(position)
        marker?.let {
            it.position = position
            updateInfoWindow()
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

    fun setInfoWindow(callout: BaiduMapCallout) {
        this.callout = callout

        // We need to updateCustomInfoWindow before showInfoWindow
        // because callout view may contain Image.
        //
        // But notice that if Image source is remote URI,
        // This hack will not work.
        callout.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            updateCustomInfoWindow()
            handler.postDelayed({ updateCustomInfoWindow() }, 100)
            handler.postDelayed({ active = active }, 500)
        }
    }

    fun select() {
        updateCustomInfoWindow()
        mapView?.map?.showInfoWindow(infoWindow)
    }

    private fun updateInfoWindow() {
        updateDefaultInfoWindow()
        active = active
    }

    @SuppressLint("SetTextI18n")
    private fun updateDefaultInfoWindow() {
        if (marker?.title != null) {
            val callout = Button(context)
            callout.text = " " + marker?.title + " "
            callout.transformationMethod = null
            callout.setBackgroundResource(R.drawable.callout)
            val bitmapDescriptor = BitmapDescriptorFactory.fromView(callout)
            infoWindow = InfoWindow(bitmapDescriptor, marker?.position, -imageView.height, {
                mapView?.emit(id, "onCalloutPress")
            })
        }
    }

    private fun updateCustomInfoWindow() {
        callout?.let {
            if (it.width > 0 && it.height > 0) {
                val bitmap = Bitmap.createBitmap(it.width, it.height, Bitmap.Config.ARGB_8888)
                it.draw(Canvas(bitmap))
                val bitmapDescriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
                infoWindow = InfoWindow(bitmapDescriptor, marker?.position, -imageView.height, {
                    mapView?.emit(it.id, "onPress")
                    mapView?.emit(id, "onCalloutPress")
                })
            }
        }
    }

    override fun addTo(mapView: BaiduMapView) {
        this.mapView = mapView
        marker = mapView.map.addOverlay(options) as Marker
        updateInfoWindow()
    }

    override fun remove() {
        marker?.remove()
    }
}
