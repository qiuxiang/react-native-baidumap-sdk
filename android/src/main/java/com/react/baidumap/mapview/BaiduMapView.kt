package com.react.baidumap.mapview

import android.content.Context
import android.widget.FrameLayout
import com.baidu.mapapi.map.MapView

class BaiduMapView(context: Context) : FrameLayout(context) {
    private val mapView = MapView(context)

    init {
        mapView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        super.addView(mapView)
    }

    fun destroy() {
        mapView.onDestroy()
    }
}
