package cn.qiuxiang.react.baidumap.mapview

import com.baidu.mapapi.SDKInitializer
import com.baidu.mapapi.map.BaiduMap.MAP_TYPE_NORMAL
import com.baidu.mapapi.map.BaiduMap.MAP_TYPE_SATELLITE
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapViewManager : ViewGroupManager<BaiduMapView>() {
    override fun getName(): String {
        return "BaiduMapView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): BaiduMapView {
        SDKInitializer.initialize(reactContext.applicationContext)
        return BaiduMapView(reactContext)
    }

    override fun onDropViewInstance(mapView: BaiduMapView) {
        super.onDropViewInstance(mapView)
        mapView.destroy()
    }

    @ReactProp(name = "satellite")
    fun setSatellite(mapView: BaiduMapView, satellite: Boolean) {
        mapView.map.mapType = if (satellite) MAP_TYPE_SATELLITE else MAP_TYPE_NORMAL
    }
}
