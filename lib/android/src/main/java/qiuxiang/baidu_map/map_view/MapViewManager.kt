package qiuxiang.baidu_map.map_view

import android.view.View
import com.baidu.mapapi.map.BaiduMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import qiuxiang.baidu_map.getEventTypeConstants

@Suppress("unused")
internal class MapViewManager : ViewGroupManager<MapView>() {
  private val commands = mapOf(
    "moveCamera" to { view: MapView, args: ReadableArray? -> view.moveCamera(args) },
    "call" to { view: MapView, args: ReadableArray? -> view.call(args) },
  )

  override fun getName(): String {
    return "BaiduMapView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MapView {
    return MapView(reactContext)
  }

  override fun onDropViewInstance(view: MapView) {
    super.onDropViewInstance(view)
    view.mapView.onDestroy()
  }

  override fun getCommandsMap(): Map<String, Int> {
    return commands.keys.mapIndexed { index, key -> key to index }.toMap()
  }

  override fun receiveCommand(view: MapView, command: Int, args: ReadableArray?) {
    commands.values.toList()[command](view, args)
  }

  override fun addView(mapView: MapView, child: View, index: Int) {
    mapView.add(child)
    super.addView(mapView, child, index)
  }

  override fun removeViewAt(parent: MapView, index: Int) {
    parent.remove(parent.getChildAt(index))
    super.removeViewAt(parent, index)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants(
      "onLoad",
      "onPress",
      "onPressPoi",
      "onLongPress",
      "onCameraMove",
      "onCameraIdle",
      "onLocation",
      "onCallback",
    )
  }

  @ReactProp(name = "initialCameraPosition")
  fun setInitialCameraPosition(view: MapView, position: ReadableMap) {
    view.setInitialCameraPosition(position)
  }

  @ReactProp(name = "myLocationEnabled")
  fun setMyLocationEnabled(view: MapView, enabled: Boolean) {
    view.map.isMyLocationEnabled = enabled
  }

  @ReactProp(name = "indoorViewEnabled")
  fun setIndoorViewEnabled(view: MapView, enabled: Boolean) {
    view.map.setIndoorEnable(enabled)
  }

  @ReactProp(name = "buildingsEnabled")
  fun setBuildingsEnabled(view: MapView, enabled: Boolean) {
    view.map.isBuildingsEnabled = enabled
  }

  @ReactProp(name = "compassEnabled")
  fun setCompassEnabled(view: MapView, show: Boolean) {
    view.map.uiSettings.isCompassEnabled = show
  }

  @ReactProp(name = "zoomControlsEnabled")
  fun setZoomControlsEnabled(view: MapView, enabled: Boolean) {
    view.mapView.showZoomControls(enabled)
  }

  @ReactProp(name = "scaleControlsEnabled")
  fun setScaleControlsEnabled(view: MapView, enabled: Boolean) {
    view.mapView.showScaleControl(enabled)
  }

  @ReactProp(name = "trafficEnabled")
  fun setTrafficEnabled(view: MapView, enabled: Boolean) {
    view.map.isTrafficEnabled = enabled
  }

  @ReactProp(name = "mapType")
  fun setMapType(view: MapView, mapType: Int) {
    view.map.mapType = mapType + 1
  }

  @ReactProp(name = "zoomGesturesEnabled")
  fun setZoomGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isZoomGesturesEnabled = enabled
  }

  @ReactProp(name = "scrollGesturesEnabled")
  fun setScrollGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isScrollGesturesEnabled = enabled
  }

  @ReactProp(name = "rotateGesturesEnabled")
  fun setRotateGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isRotateGesturesEnabled = enabled
  }

  @ReactProp(name = "tiltGesturesEnabled")
  fun setTiltGesturesEnabled(view: MapView, enabled: Boolean) {
    view.map.uiSettings.isOverlookingGesturesEnabled = enabled
  }
}
