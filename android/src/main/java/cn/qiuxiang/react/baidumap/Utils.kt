package cn.qiuxiang.react.baidumap

import com.baidu.mapapi.SDKInitializer
import com.baidu.mapapi.model.LatLng
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext

var isInitialized = false

fun initialize(context: ThemedReactContext) {
    if (!isInitialized) {
        SDKInitializer.initialize(context.applicationContext)
    }
}

fun createWritableMapFromLatLng(latLng: LatLng): WritableMap {
    val writableMap = Arguments.createMap()
    writableMap.putDouble("latitude", latLng.latitude)
    writableMap.putDouble("longitude", latLng.longitude)
    return writableMap
}

fun ReadableMap.toLatLng(): LatLng {
    return LatLng(this.getDouble("latitude"), this.getDouble("longitude"))
}

fun ReadableArray.toLatLngList(): List<LatLng> {
    return (0..(this.size() - 1)).map { this.getMap(it).toLatLng() }
}
