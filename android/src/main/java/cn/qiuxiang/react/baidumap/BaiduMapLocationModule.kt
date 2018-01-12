package cn.qiuxiang.react.baidumap

import com.baidu.location.BDAbstractLocationListener
import com.baidu.location.BDLocation
import com.baidu.location.LocationClient
import com.baidu.location.LocationClientOption.LocationMode
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
                data.putString("time", location.time)
                data.putString("coordinateType", location.coorType)
                data.putDouble("accuracy", location.radius.toDouble())
                data.putDouble("latitude", location.latitude)
                data.putDouble("longitude", location.longitude)
                data.putDouble("altitude", location.altitude)
                data.putDouble("speed", location.speed.toDouble())
                data.putDouble("direction", location.direction.toDouble())
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
                data.putInt("locationType", location.locType) // todo: to string
                emitter.emit("baiduMapLocation", data)
            }
        })
    }

    override fun getName(): String {
        return "BaiduMapLocation"
    }

    @ReactMethod
    fun setOptions(options: ReadableMap) {
        if (options.hasKey("locationMode")) {
            locationClient.locOption.locationMode = LocationMode.valueOf(options.getString("locationMode"))
        }

        if (options.hasKey("coordinateType")) {
            locationClient.locOption.coorType = options.getString("coordinateType")
        }

        if (options.hasKey("scanSpan")) {
            locationClient.locOption.scanSpan = options.getInt("scanSpan")
        }

        if (options.hasKey("detailed")) {
            val detailed = options.getBoolean("detailed")
            locationClient.locOption.setIsNeedAddress(detailed)
            locationClient.locOption.setIsNeedLocationDescribe(detailed)
        }

        if (options.hasKey("minDistance")) {
            locationClient.locOption.autoNotifyMinDistance = options.getInt("minDistance")
            locationClient.locOption.setOpenAutoNotifyMode(0, 0, 0)
        }

        if (options.hasKey("autoMode")) {
            if (options.getBoolean("autoMode")) {
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
