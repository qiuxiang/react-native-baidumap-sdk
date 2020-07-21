package cn.qiuxiang.react.baidumap

import android.content.res.Resources
import android.graphics.Point
import com.baidu.mapapi.map.MyLocationData
import com.baidu.mapapi.model.LatLng
import com.baidu.mapapi.model.LatLngBounds
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

fun ReadableMap.toPoint(): Point {
    return Point(
            this.getDouble("x").toFloat().toPx(),
            this.getDouble("y").toFloat().toPx()
    )
}

fun ReadableMap.toLatLng(): LatLng {
    return LatLng(this.getDouble("latitude"), this.getDouble("longitude"))
}

fun ReadableMap.toLatLngBounds(): LatLngBounds {
    val latitude = this.getDouble("latitude")
    val longitude = this.getDouble("longitude")
    val latitudeDelta = this.getDouble("latitudeDelta")
    val longitudeDelta = this.getDouble("longitudeDelta")
    return LatLngBounds.Builder()
            .include(LatLng(latitude - latitudeDelta / 2, longitude - longitudeDelta / 2))
            .include(LatLng(latitude + latitudeDelta / 2, longitude + longitudeDelta / 2))
            .build()
}

fun ReadableMap.toLocationData(): MyLocationData {
    val builder = MyLocationData.Builder()
            .latitude(this.getDouble("latitude"))
            .longitude(this.getDouble("longitude"))

    if (this.hasKey("accuracy")) {
        builder.accuracy(this.getDouble("accuracy").toFloat())
    }

    if (this.hasKey("direction")) {
        builder.direction(this.getDouble("direction").toFloat())
    }

    return builder.build()
}

fun ReadableArray.toLatLngList(): List<LatLng> {
    return (0 until this.size()).map { this.getMap(it)!!.toLatLng() }
}

fun LatLng.toWritableMap(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("latitude", this.latitude)
    map.putDouble("longitude", this.longitude)
    return map
}

fun LatLngBounds.toWritableMap(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("latitude", this.center.latitude)
    map.putDouble("longitude", this.center.longitude)
    map.putDouble("latitudeDelta", Math.abs(this.southwest.latitude - this.northeast.latitude))
    map.putDouble("longitudeDelta", Math.abs(this.southwest.longitude - this.northeast.longitude))
    return map
}

fun Float.toPx(): Int {
    return (this * Resources.getSystem().displayMetrics.density).toInt()
}
