package cn.qiuxiang.react.baidumap.map

import android.content.Context
import android.widget.FrameLayout
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

        map.setOnMapClickListener(object : BaiduMap.OnMapClickListener {
            override fun onMapPoiClick(poi: MapPoi): Boolean {
                val data = Arguments.createMap()
                data.putString("name", poi.name)
                data.putString("uid", poi.uid)
                data.putDouble("latitude", poi.position.latitude)
                data.putDouble("longitude", poi.position.longitude)
                emit(id, "onPress", data)
                return true
            }

            override fun onMapClick(latLng: LatLng) {
                val data = Arguments.createMap()
                data.putDouble("latitude", latLng.latitude)
                data.putDouble("longitude", latLng.longitude)
                emit(id, "onPress", data)
            }
        })

        map.setOnMapLongClickListener { latLng ->
            val data = Arguments.createMap()
            data.putDouble("latitude", latLng.latitude)
            data.putDouble("longitude", latLng.longitude)
            emit(id, "onLongPress", data)
        }

        map.setOnMapStatusChangeListener(object : BaiduMap.OnMapStatusChangeListener {
            override fun onMapStatusChangeStart(stataus: MapStatus) {}

            override fun onMapStatusChangeStart(status: MapStatus, reason: Int) {}

            override fun onMapStatusChange(status: MapStatus) {}

            override fun onMapStatusChangeFinish(status: MapStatus) {
                val data = Arguments.createMap()
                data.putDouble("zoomLevel", status.zoom.toDouble())
                data.putDouble("overlook", status.overlook.toDouble())
                data.putDouble("rotation", status.rotate.toDouble())
                data.putDouble("latitude", status.target.latitude)
                data.putDouble("longitude", status.target.longitude)
                data.putDouble("latitudeDelta", Math.abs(
                    status.bound.southwest.latitude - status.bound.northeast.latitude))
                data.putDouble("longitudeDelta", Math.abs(
                    status.bound.southwest.longitude - status.bound.northeast.longitude))
                emit(id, "onStatusChange", data)
            }
        })
    }

    fun destroy() {
        mapView.onDestroy()
    }

    fun emit(id: Int?, name: String, data: WritableMap = Arguments.createMap()) {
        id?.let { emitter.receiveEvent(it, name, data) }
    }

    fun animateTo(args: ReadableArray?) {
        val target = args?.getMap(0)!!
        val duration = args.getInt(1)
        val mapStatusBuilder = MapStatus.Builder()

        if (target.hasKey("center")) {
            val json = target.getMap("center")
            mapStatusBuilder.target(LatLng(
                json.getDouble("latitude"),
                json.getDouble("longitude")))
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
}
