package com.react.baidumap.mapview

import com.baidu.mapapi.SDKInitializer
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

internal class BaiduMapViewManager : ViewGroupManager<BaiduMapView>() {
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
}
