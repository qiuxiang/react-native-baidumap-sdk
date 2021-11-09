package qiuxiang.baidu_map.map_view

import android.annotation.SuppressLint
import android.view.View
import android.widget.FrameLayout
import com.baidu.mapapi.map.*
import com.baidu.mapapi.map.MapView
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import qiuxiang.baidu_map.getFloat
import qiuxiang.baidu_map.toJson
import qiuxiang.baidu_map.toLatLng
import qiuxiang.baidu_map.toPoint

@SuppressLint("ViewConstructor")
class MapView(context: ThemedReactContext) : FrameLayout(context) {
  @Suppress("Deprecation")
  private val eventEmitter =
    context.getJSModule(com.facebook.react.uimanager.events.RCTEventEmitter::class.java)
  private val markerMap = HashMap<String, Marker>()
  private val polylineMap = HashMap<com.baidu.mapapi.map.Polyline, Polyline>()
  private var initialCameraPosition: ReadableMap? = null
  val mapView = MapView(context)
  val map: BaiduMap by lazy { mapView.map }

  init {
    addView(mapView)

    map.setOnMapLoadedCallback { emit(id, "onLoad") }
    map.setOnMapLongClickListener { latLng -> emit(id, "onLongPress", latLng.toJson()) }

    map.setOnMapClickListener(object : BaiduMap.OnMapClickListener {
      override fun onMapClick(latLng: LatLng) {
        emit(id, "onPress", latLng.toJson())
      }

      override fun onMapPoiClick(poi: MapPoi) {
        emit(id, "onPressPoi", poi.toJson())
      }
    })

    map.setOnPolylineClickListener { polyline ->
      emit(polylineMap[polyline]?.id, "onPress")
      true
    }

    map.setOnMarkerClickListener { marker ->
      markerMap[marker.id]?.let { emit(it.id, "onPress") }
      true
    }

    map.setOnMarkerDragListener(object : BaiduMap.OnMarkerDragListener {
      override fun onMarkerDrag(marker: com.baidu.mapapi.map.Marker) {
        emit(markerMap[marker.id]?.id, "onDrag")
      }

      override fun onMarkerDragEnd(marker: com.baidu.mapapi.map.Marker) {
        emit(markerMap[marker.id]?.id, "onDragEnd", marker.position.toJson())
      }

      override fun onMarkerDragStart(marker: com.baidu.mapapi.map.Marker) {
        emit(markerMap[marker.id]?.id, "onDragStart")
      }
    })

    map.setOnMapStatusChangeListener(object : BaiduMap.OnMapStatusChangeListener {
      override fun onMapStatusChangeStart(p0: MapStatus) {}
      override fun onMapStatusChangeStart(p0: MapStatus, p1: Int) {}
      override fun onMapStatusChange(position: MapStatus) {
        emit(id, "onCameraMove", Arguments.createMap().apply {
          putMap("cameraPosition", position.toJson())
          putMap("latLngBounds", map.mapStatus.bound.toJson())
        })
      }

      override fun onMapStatusChangeFinish(position: MapStatus) {
        emit(id, "onCameraIdle", Arguments.createMap().apply {
          putMap("cameraPosition", position.toJson())
          putMap("latLngBounds", map.mapStatus.bound.toJson())
        })
      }
    })
  }

  fun emit(id: Int?, event: String, data: WritableMap = Arguments.createMap()) {
    @Suppress("Deprecation")
    id?.let { eventEmitter.receiveEvent(it, event, data) }
  }

  fun add(child: View) {
    if (child is Overlay) {
      child.add(map)
      if (child is Marker) {
        markerMap[child.marker?.id!!] = child
      }
      if (child is Polyline) {
        polylineMap[child.polyline!!] = child
      }
    }
  }

  fun remove(child: View) {
    if (child is Overlay) {
      child.remove()
      if (child is Marker) {
        markerMap.remove(child.marker?.id)
      }
      if (child is Polyline) {
        polylineMap.remove(child.polyline!!)
      }
    }
  }

  fun moveCamera(args: ReadableArray?) {
    val params = args?.getMap(0)!!
    val duration = args.getInt(1)
    val builder = MapStatus.Builder()
    params.getMap("target")?.toLatLng()?.let { builder.target(it) }
    params.getFloat("zoom")?.let { builder.zoom(it) }
    params.getFloat("tilt")?.let { builder.overlook(it) }
    params.getFloat("bearing")?.let { builder.rotate(it) }
    if (duration > 0) {
      map.animateMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()), duration)
    } else {
      map.setMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()))
    }
  }

  fun setInitialCameraPosition(position: ReadableMap) {
    if (initialCameraPosition == null) {
      initialCameraPosition = position
      moveCamera(Arguments.createArray().apply {
        pushMap(Arguments.createMap().apply { merge(position) })
        pushInt(0)
      })
    }
  }

  fun call(args: ReadableArray?) {
    val id = args?.getDouble(0)!!
    when (args.getString(1)) {
      "getLatLng" -> callback(
        id,
        map.projection.fromScreenLocation(args.getMap(2).toPoint()).toJson()
      )
    }
  }

  private fun callback(id: Double, data: Any) {
    emit(this.id, "onCallback", Arguments.createMap().apply {
      putDouble("id", id)
      when (data) {
        is WritableMap -> putMap("data", data)
      }
    })
  }
}
