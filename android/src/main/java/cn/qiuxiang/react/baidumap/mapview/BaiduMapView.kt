package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.view.View
import android.widget.FrameLayout
import cn.qiuxiang.react.baidumap.createWritableMapFromLatLng
import cn.qiuxiang.react.baidumap.toLatLng
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class BaiduMapView(context: Context) : FrameLayout(context) {
    private val emitter: RCTEventEmitter = (context as ThemedReactContext)
        .getJSModule(RCTEventEmitter::class.java)

    val mapView = TextureMapView(context)
    val map: BaiduMap by lazy { mapView.map }

    init {
        mapView.layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        super.addView(mapView)

        map.setOnMapLoadedCallback {
            emit(id, "onLoad")
        }

        map.setOnMapClickListener(object : BaiduMap.OnMapClickListener {
            override fun onMapPoiClick(poi: MapPoi): Boolean {
                val data = createWritableMapFromLatLng(poi.position)
                data.putString("name", poi.name)
                data.putString("uid", poi.uid)
                emit(id, "onClick", data)
                map.hideInfoWindow()
                return true
            }

            override fun onMapClick(latLng: LatLng) {
                emit(id, "onClick", createWritableMapFromLatLng(latLng))
                map.hideInfoWindow()
            }
        })

        map.setOnMapDoubleClickListener { latLng ->
            emit(id, "onDoubleClick", createWritableMapFromLatLng(latLng))
        }

        map.setOnMapLongClickListener { latLng ->
            emit(id, "onLongClick", createWritableMapFromLatLng(latLng))
        }

        map.setOnMapStatusChangeListener(object : BaiduMap.OnMapStatusChangeListener {
            override fun onMapStatusChangeStart(status: MapStatus) {}
            override fun onMapStatusChangeStart(status: MapStatus, reason: Int) {}
            override fun onMapStatusChange(status: MapStatus) {}
            override fun onMapStatusChangeFinish(status: MapStatus) {
                val data = createWritableMapFromLatLng(status.target)
                data.putDouble("zoomLevel", status.zoom.toDouble())
                data.putDouble("overlook", status.overlook.toDouble())
                data.putDouble("rotation", status.rotate.toDouble())
                data.putDouble("latitudeDelta", Math.abs(
                    status.bound.southwest.latitude - status.bound.northeast.latitude))
                data.putDouble("longitudeDelta", Math.abs(
                    status.bound.southwest.longitude - status.bound.northeast.longitude))
                emit(id, "onStatusChange", data)
            }
        })

        map.setOnMarkerClickListener { marker ->
            emit(marker.extraInfo?.getInt("id"), "onPress")
            true
        }
    }

    fun destroy() {
        mapView.onDestroy()
    }

    fun emit(id: Int?, name: String, data: WritableMap = Arguments.createMap()) {
        id?.let { emitter.receiveEvent(it, name, data) }
    }

    fun animateTo(args: ReadableArray?) {
        val target = args!!.getMap(0)
        val duration = args.getInt(1)
        val mapStatusBuilder = MapStatus.Builder()

        if (target.hasKey("center")) {
            mapStatusBuilder.target(target.getMap("center").toLatLng())
        }

        if (target.hasKey("zoomLevel")) {
            mapStatusBuilder.zoom(target.getDouble("zoomLevel").toFloat())
        }

        if (target.hasKey("overlook")) {
            mapStatusBuilder.overlook(target.getDouble("overlook").toFloat())
        }

        if (target.hasKey("rotation")) {
            mapStatusBuilder.rotate(target.getDouble("rotation").toFloat())
        }

        map.animateMapStatus(
            MapStatusUpdateFactory.newMapStatus(mapStatusBuilder.build()), duration)
    }

    fun add(view: View) {
        if (view is BaiduMapOverlay) {
            view.addTo(this)
        }
    }

    fun remove(view: View) {
        if (view is BaiduMapOverlay) {
            view.remove()
        }
    }
}
