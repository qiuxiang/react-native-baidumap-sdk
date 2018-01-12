package cn.qiuxiang.react.baidumap

import com.baidu.location.BDAbstractLocationListener
import com.baidu.location.BDLocation
import com.baidu.location.LocationClient
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

@Suppress("unused")
class BaiduMapLocationModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private val locationClient = LocationClient(context.applicationContext)
    private val emitter by lazy { context.getJSModule(RCTDeviceEventEmitter::class.java) }

    init {
        locationClient.registerLocationListener(object : BDAbstractLocationListener() {
            override fun onReceiveLocation(location: BDLocation) {
                val data = Arguments.createMap()
                data.putString("coordinateType", location.coorType)
                data.putDouble("accuracy", location.radius.toDouble())
                data.putDouble("latitude", location.latitude)
                data.putDouble("longitude", location.longitude)
                data.putDouble("altitude", location.altitude)
                data.putDouble("speed", location.speed.toDouble())
                data.putString("country", location.country)
                data.putString("countryCode", location.countryCode)
                data.putString("province", location.province)
                data.putString("city", location.city)
                data.putString("cityCode", location.cityCode)
                data.putString("district", location.district)
                data.putString("street", location.street)
                data.putString("streetNumber", location.streetNumber)
                data.putString("adCode", location.adCode)
                data.putString("description", location.locationDescribe)
                data.putInt("errorCode", location.locType)
                emitter.emit("baiduMapLocation", data)
            }
        })
    }

    override fun getName(): String {
        return "BaiduMapLocation"
    }

    @ReactMethod
    fun setOptions(option: ReadableMap) {
        if (option.hasKey("coordinateType")) {
            locationClient.locOption.coorType = option.getString("coordinateType")
        }

        if (option.hasKey("androidScanSpan")) {
            locationClient.locOption.scanSpan = option.getInt("androidScanSpan")
        }

        if (option.hasKey("detailed")) {
            val detailed = option.getBoolean("detailed")
            locationClient.locOption.setIsNeedAddress(detailed)
            locationClient.locOption.setIsNeedLocationDescribe(detailed)
        }

        if (option.hasKey("distanceFilter")) {
            locationClient.locOption.autoNotifyMinDistance = option.getInt("distanceFilter")
        }

        if (option.hasKey("autoMode")) {
            if (option.getBoolean("autoMode")) {
                locationClient.locOption.setOpenAutoNotifyMode()
            }
        }
    }

    @ReactMethod
    fun start() {
        locationClient.start()
    }

    @ReactMethod
    fun stop() {
        locationClient.stop()
    }

    @ReactMethod
    fun request() {
        locationClient.requestLocation()
    }
}
