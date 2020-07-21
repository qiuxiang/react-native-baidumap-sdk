package cn.qiuxiang.react.baidumap.mapview

import android.content.Context
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.widget.FrameLayout
import cn.qiuxiang.react.baidumap.*
import com.baidu.mapapi.map.*
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class BaiduMapView(context: Context) : FrameLayout(context) {
    private val emitter = (context as ThemedReactContext).getJSModule(RCTEventEmitter::class.java)
    private val markers = HashMap<String, BaiduMapMarker>()

    val mapView = MapView(context)
    val map: BaiduMap by lazy { mapView.map }

    var compassDisabled = false
        set(value) {
            field = value
            map.setCompassEnable(!value)
        }

    var paused = false
        set(value) {
            if (!field && value) {
                mapView.onPause()
                removeView(mapView)
            }

            if (field && !value) {
                addView(mapView)
                mapView.onResume()
            }

            field = value
        }

    init {
//        mapView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
//        map.setMyLocationConfiguration(MyLocationConfiguration(MyLocationConfiguration.LocationMode.NORMAL, true, null))
//        val view = TextView(context)
//        view.text = "ffff"
        addView(mapView)
//        Handler().postDelayed({
//            super.addView(mapView)
//        }, 2000)
//        LayoutInflater.from(context).inflate(R.layout.mapview, this)

        map.setOnMapLoadedCallback {
            emit(id, "onLoad")
            emitStatusChangeEvent(map.mapStatus)

            // Some bugs (probably by ReactView) cause the compass to fail to display
            // So I do some hack
            if (!compassDisabled) {
                map.setCompassEnable(false)
                map.setCompassEnable(true)
            }
        }

        map.setOnMapClickListener(object : BaiduMap.OnMapClickListener {
            override fun onMapPoiClick(poi: MapPoi) {
                val data = poi.position.toWritableMap()
                data.putString("name", poi.name)
                data.putString("uid", poi.uid)
                emit(id, "onClick", data)
                map.hideInfoWindow()
            }

            override fun onMapClick(latLng: LatLng) {
                emit(id, "onClick", latLng.toWritableMap())
                map.hideInfoWindow()
            }
        })

        map.setOnMapDoubleClickListener { latLng ->
            emit(id, "onDoubleClick", latLng.toWritableMap())
        }

        map.setOnMapLongClickListener { latLng ->
            emit(id, "onLongClick", latLng.toWritableMap())
        }

        map.setOnMapStatusChangeListener(object : BaiduMap.OnMapStatusChangeListener {
            override fun onMapStatusChangeStart(status: MapStatus) {}
            override fun onMapStatusChangeStart(status: MapStatus, reason: Int) {}
            override fun onMapStatusChange(status: MapStatus) {}
            override fun onMapStatusChangeFinish(status: MapStatus) {
                emitStatusChangeEvent(status)
            }
        })

        map.setOnMarkerClickListener { marker ->
            val markerView = markers[marker.id]
            markerView?.active = true
            emit(markerView?.id, "onPress")
            true
        }

        map.setOnMarkerDragListener(object : BaiduMap.OnMarkerDragListener {
            override fun onMarkerDragEnd(marker: Marker) {
                emitDragEvent(marker, "onDragEnd")
            }

            override fun onMarkerDragStart(marker: Marker) {
                map.hideInfoWindow()
                emitDragEvent(marker, "onDragStart")
            }

            override fun onMarkerDrag(marker: Marker) {
                emitDragEvent(marker, "onDrag")
            }
        })
    }

    override fun dispatchTouchEvent(event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            parent.requestDisallowInterceptTouchEvent(true)
        } else if (event.action == MotionEvent.ACTION_UP) {
            parent.requestDisallowInterceptTouchEvent(false)
        }
        return super.dispatchTouchEvent(event)
    }

    fun emit(id: Int?, name: String, data: WritableMap = Arguments.createMap()) {
        id?.let { emitter.receiveEvent(it, name, data) }
    }

    fun emitDragEvent(marker: Marker, event: String) {
        val markerView = markers[marker.id]
        markerView?.let {
            emit(it.id, event, it.position?.toWritableMap()!!)
        }
    }

    fun emitStatusChangeEvent(status: MapStatus) {
        val data = Arguments.createMap()
        data.putMap("center", status.target.toWritableMap())
        data.putMap("region", status.bound.toWritableMap())
        data.putDouble("zoomLevel", status.zoom.toDouble())
        data.putDouble("overlook", status.overlook.toDouble())
        data.putDouble("rotation", status.rotate.toDouble())
        emit(id, "onStatusChange", data)
    }

    fun setStatus(args: ReadableArray?) {
        val target = args!!.getMap(0)
        val duration = args.getInt(1)
        val mapStatusBuilder = MapStatus.Builder()

        if (target!!.hasKey("center")) {
            mapStatusBuilder.target(target.getMap("center")!!.toLatLng())
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

        if (target.hasKey("point")) {
            val point = target.getMap("point")!!.toPoint()
            mapStatusBuilder.target(map.projection.fromScreenLocation(point))
        }

        if (target.hasKey("region")) {
            setStatus(MapStatusUpdateFactory.newLatLngBounds(
                    target.getMap("region")!!.toLatLngBounds()), duration)
        } else {
            setStatus(MapStatusUpdateFactory.newMapStatus(mapStatusBuilder.build()), duration)
        }
    }

    private fun setStatus(statusUpdate: MapStatusUpdate, duration: Int) {
        if (duration == 0) {
            map.setMapStatus(statusUpdate)
        } else {
            map.animateMapStatus(statusUpdate, duration)
        }
    }

    fun add(view: View) {
        if (view is BaiduMapOverlay) {
            view.addTo(this)
            when (view) {
                is BaiduMapMarker -> markers[view.marker?.id!!] = view
            }
        }
    }

    fun remove(view: View) {
        if (view is BaiduMapOverlay) {
            view.remove()
            when (view) {
                is BaiduMapMarker -> markers.remove(view.marker?.id)
            }
        }
    }
}
