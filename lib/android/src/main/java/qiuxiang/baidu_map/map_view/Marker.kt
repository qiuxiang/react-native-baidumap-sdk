package qiuxiang.baidu_map.map_view

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.view.View
import com.baidu.mapapi.map.*
import com.baidu.mapapi.map.Marker
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.views.view.ReactViewGroup
import qiuxiang.baidu_map.fetchImage

class Marker(context: Context) : ReactViewGroup(context), Overlay {
  private var view: View? = null
  private var icon: BitmapDescriptor? = null
  private var anchorX: Float = 0.5f
  private var anchorY: Float = 1f
  var marker: Marker? = null

  companion object {
    val icon: BitmapDescriptor = BitmapDescriptorFactory.fromBitmap(Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888))
  }

  var position: LatLng? = null
    set(value) {
      field = value
      marker?.position = value
    }

  var zIndex: Int = 0
    set(value) {
      field = value
      marker?.zIndex = value
    }

  var flat: Boolean = false
    set(value) {
      field = value
      marker?.isFlat = value
    }

  var opacity: Float = 1f
    set(value) {
      field = value
      marker?.alpha = value
    }

  var draggable: Boolean = false
    set(value) {
      field = value
      marker?.isDraggable = value
    }

  fun updateIcon() {
    view?.let {
      if (it.width != 0 && it.height != 0) {
        val bitmap = Bitmap.createBitmap(it.width, it.height, Bitmap.Config.ARGB_8888)
        it.draw(Canvas(bitmap))
        icon = BitmapDescriptorFactory.fromBitmap(bitmap)
        marker?.icon = icon
      }
    }
  }

  fun setAnchor(x: Double, y: Double) {
    anchorX = x.toFloat()
    anchorY = y.toFloat()
    marker?.setAnchor(anchorX, anchorY)
  }

  override fun addView(child: View, index: Int) {
    super.addView(child, index)
    view = child
    view?.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ -> updateIcon() }
  }

  fun setIcon(source: ReadableMap) {
    fetchImage(source) {
      icon = it
      marker?.icon = it
    }
  }

  override fun add(map: BaiduMap) {
    marker = map.addOverlay(
      MarkerOptions()
        .flat(flat)
        .icon(icon ?: qiuxiang.baidu_map.map_view.Marker.icon)
        .alpha(opacity)
        .draggable(draggable)
        .position(position)
        .anchor(anchorX, anchorY)
        .zIndex(zIndex)
    ) as Marker
  }

  override fun remove() {
    marker?.remove()
  }
}
