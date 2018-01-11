package cn.qiuxiang.react.baidumap.map

import android.content.Context
import android.widget.FrameLayout
import com.baidu.mapapi.map.BaiduMap
import com.baidu.mapapi.map.MapStatus
import com.baidu.mapapi.map.MapStatusUpdateFactory
import com.baidu.mapapi.map.TextureMapView
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.ReadableArray

class BaiduMapView(context: Context) : FrameLayout(context) {
    val mapView = TextureMapView(context)
    val map: BaiduMap by lazy { mapView.map }

    init {
        mapView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        super.addView(mapView)
    }

    fun destroy() {
        mapView.onDestroy()
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
            MapStatusUpdateFactory.newMapStatus(mapStatusBuilder.build()),duration)
    }
}
