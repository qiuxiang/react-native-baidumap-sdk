package cn.qiuxiang.react.baidumap.mapview

import cn.qiuxiang.react.baidumap.initialize
import cn.qiuxiang.react.baidumap.toLatLng
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
class BaiduMapMarkerManager : ViewGroupManager<BaiduMapMarker>() {
    override fun createViewInstance(context: ThemedReactContext): BaiduMapMarker {
        initialize(context)
        return BaiduMapMarker(context)
    }

    override fun getName(): String {
        return "BaiduMapMarker"
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
            "onMarkerClick", MapBuilder.of("registrationName", "onBaiduMapClick")
        )
    }

    @ReactProp(name = "coordinate")
    fun setCoordinate(view: BaiduMapMarker, coordinate: ReadableMap) {
        view.setPosition(coordinate.toLatLng())
    }

    @ReactProp(name = "title")
    fun setTitle(view: BaiduMapMarker, title: String) {
        view.setTitle(title)
    }

    @ReactProp(name = "color", customType = "Color")
    fun setColor(view: BaiduMapMarker, color: Int) {
        view.setColor(color)
    }

    @ReactProp(name = "image")
    fun setImage(view: BaiduMapMarker, image: String) {
        view.setImage(image)
    }
}
