package cn.qiuxiang.react.baidumap.mapview

import android.view.View
import cn.qiuxiang.react.baidumap.toLatLng
import cn.qiuxiang.react.baidumap.toLocationData
import com.baidu.mapapi.map.BaiduMap.MAP_TYPE_NORMAL
import com.baidu.mapapi.map.BaiduMap.MAP_TYPE_SATELLITE
import com.baidu.mapapi.map.MapStatus
import com.baidu.mapapi.map.MapStatusUpdateFactory
import com.baidu.mapapi.map.MyLocationConfiguration
import com.baidu.mapapi.map.MyLocationConfiguration.LocationMode
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapViewManager : ViewGroupManager<BaiduMapView>() {
    override fun getName(): String {
        return "BaiduMapView"
    }

    override fun createViewInstance(context: ThemedReactContext): BaiduMapView {
        return BaiduMapView(context)
    }

    override fun onDropViewInstance(mapView: BaiduMapView) {
        super.onDropViewInstance(mapView)
        mapView.mapView.onDestroy()
    }

    override fun addView(mapView: BaiduMapView, view: View, index: Int) {
        mapView.add(view)
        super.addView(mapView, view, index)
    }

    override fun removeViewAt(mapView: BaiduMapView, index: Int) {
        mapView.remove(mapView.getChildAt(index))
        super.removeViewAt(mapView, index)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
                "onLoad", MapBuilder.of("registrationName", "onBaiduMapLoad"),
                "onClick", MapBuilder.of("registrationName", "onBaiduMapClick"),
                "onLongClick", MapBuilder.of("registrationName", "onBaiduMapLongClick"),
                "onDoubleClick", MapBuilder.of("registrationName", "onBaiduMapDoubleClick"),
                "onStatusChange", MapBuilder.of("registrationName", "onBaiduMapStatusChange")
        )
    }

    companion object {
        const val SET_STATUS = 0
    }

    override fun getCommandsMap(): Map<String, Int> {
        return mapOf("setStatus" to SET_STATUS)
    }

    override fun receiveCommand(mapView: BaiduMapView, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            SET_STATUS -> mapView.setStatus(args)
        }
    }

    @ReactProp(name = "satellite")
    fun setSatellite(mapView: BaiduMapView, satellite: Boolean) {
        mapView.map.mapType = if (satellite) MAP_TYPE_SATELLITE else MAP_TYPE_NORMAL
    }

    @ReactProp(name = "trafficEnabled")
    fun setTrafficEnabled(mapView: BaiduMapView, enabled: Boolean) {
        mapView.map.isTrafficEnabled = enabled
    }

    @ReactProp(name = "baiduHeatMapEnabled")
    fun setBaiduHeatMapEnabled(mapView: BaiduMapView, enabled: Boolean) {
        mapView.map.isBaiduHeatMapEnabled = enabled
    }

    @ReactProp(name = "indoorEnabled")
    fun setIndoorEnabled(mapView: BaiduMapView, enabled: Boolean) {
        mapView.map.setIndoorEnable(enabled)
    }

    @ReactProp(name = "buildingsDisabled")
    fun setBuildingsDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.map.isBuildingsEnabled = !disabled
    }

    @ReactProp(name = "scaleBarDisabled")
    fun setScaleBarEnabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.mapView.showScaleControl(!disabled)
    }

    @ReactProp(name = "compassDisabled")
    fun setCompassEnabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.compassDisabled = disabled
    }

    @ReactProp(name = "zoomControlsDisabled")
    fun setZoomControlsDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.mapView.showZoomControls(!disabled)
    }

    @ReactProp(name = "scrollDisabled")
    fun setScrollDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.map.uiSettings.isScrollGesturesEnabled = !disabled
    }

    @ReactProp(name = "overlookDisabled")
    fun setOverlookDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.map.uiSettings.isOverlookingGesturesEnabled = !disabled
    }

    @ReactProp(name = "rotateDisabled")
    fun setRotateDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.map.uiSettings.isRotateGesturesEnabled = !disabled
    }

    @ReactProp(name = "zoomDisabled")
    fun setZoomDisabled(mapView: BaiduMapView, disabled: Boolean) {
        mapView.map.uiSettings.isZoomGesturesEnabled = !disabled
    }

    @ReactProp(name = "center")
    fun setCenter(mapView: BaiduMapView, center: ReadableMap) {
        mapView.map.setMapStatus(MapStatusUpdateFactory.newLatLng(center.toLatLng()))
    }

    @ReactProp(name = "zoomLevel")
    fun setZoomLevel(mapView: BaiduMapView, zoomLevel: Float) {
        mapView.map.setMapStatus(MapStatusUpdateFactory.zoomTo(zoomLevel))
    }

    @ReactProp(name = "rotation")
    fun setRotate(mapView: BaiduMapView, rotation: Float) {
        mapView.map.setMapStatus(MapStatusUpdateFactory.newMapStatus(
                MapStatus.Builder().rotate(rotation).build()
        ))
    }

    @ReactProp(name = "overlook")
    fun setOverlook(mapView: BaiduMapView, overlook: Float) {
        mapView.map.setMapStatus(MapStatusUpdateFactory.newMapStatus(
                MapStatus.Builder().overlook(overlook).build()
        ))
    }

    @ReactProp(name = "locationEnabled")
    fun setLocationEnabled(mapView: BaiduMapView, enabled: Boolean) {
        mapView.map.isMyLocationEnabled = enabled
    }

    @ReactProp(name = "location")
    fun setLocationEnabled(mapView: BaiduMapView, data: ReadableMap) {
        mapView.map.setMyLocationData(data.toLocationData())
    }

    @ReactProp(name = "locationMode")
    fun setCompassMode(mapView: BaiduMapView, mode: String) {
        val locationMode = when (mode) {
            "follow" -> LocationMode.FOLLOWING
            "compass" -> LocationMode.COMPASS
            else -> LocationMode.NORMAL
        }
        mapView.map.setMyLocationConfiguration(MyLocationConfiguration(locationMode, true, null))
    }

    @ReactProp(name = "paused")
    fun setPaused(mapView: BaiduMapView, paused: Boolean) {
        mapView.paused = paused
    }
}
