package cn.qiuxiang.react.baidumap.modules

import com.baidu.location.BDAbstractLocationListener
import com.baidu.location.BDLocation
import com.baidu.location.LocationClient
import com.baidu.location.LocationClientOption
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import java.text.SimpleDateFormat
import java.util.*

@Suppress("unused")
class BaiduMapLocationModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private val client = LocationClient(context.applicationContext)
    private val emitter by lazy { context.getJSModule(RCTDeviceEventEmitter::class.java) }
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA)

    init {
        val option = client.locOption
        option.coorType = "bd09ll"
        
        // option.setOpenAutoNotifyMode()
        
        option.setEnableSimulateGps(true)
        client.locOption = option
        client.registerLocationListener(object : BDAbstractLocationListener() {
            override fun onReceiveLocation(location: BDLocation) {
                val data = Arguments.createMap()
                data.putInt("timestamp", (dateFormat.parse(location.time).time / 1000).toInt())
                data.putString("coordinateType", location.coorType)
                data.putDouble("accuracy", location.radius.toDouble())
                data.putDouble("latitude", location.latitude)
                data.putDouble("longitude", location.longitude)
                data.putDouble("altitude", location.altitude)
                data.putDouble("speed", location.speed.toDouble())
                data.putDouble("direction", location.direction.toDouble())
                data.putInt("locationType", location.locType) // todo: to string
                emitter.emit("baiduMapLocation", data)
            }
        })
    }

    override fun getName(): String {
        return "BaiduMapLocation"
    }

    override fun canOverrideExistingModule(): Boolean {
        return true
    }

    @ReactMethod
    fun setOptions(options: ReadableMap) {
        var option = client.locOption

        if (options.hasKey("gps")) {
            option.setOpenGps(options.getBoolean("gps"))
        }

        if (options.hasKey("distanceFilter")) {
            option.autoNotifyMinDistance = options.getInt("distanceFilter")
        }

        if (options.hasKey("autoNotifyMode")) {
            if (options.getBoolean("autoNotifyMode")) {
                option.setOpenAutoNotifyMode()
            }
        }
        
        if (options.hasKey("scanSpan")) {
            option.setScanSpan(options.getInt("scanSpan"))
        }

        if (options.hasKey("direction")) {
            option.setNeedDeviceDirect(options.getBoolean("direction"))
        }

        if (options.hasKey("notify")) {
            option.setLocationNotify(options.getBoolean("notify"))
        }

        // Battery_Saving 低功耗模式
        // Device_Sensors 仅设备(Gps)模式
        // Hight_Accuracy 高精度模式
        if (options.hasKey("locationMode")) {
            val mode = options.getInt("locationMode")
            when (mode) {
                1 -> option.setLocationMode(LocationClientOption.LocationMode.Battery_Saving)
                2 -> option.setLocationMode(LocationClientOption.LocationMode.Device_Sensors)
                3 -> option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy)
                else -> {
                    println("错误码")
                }
            }
        }

        client.locOption = option
    }

    @ReactMethod
    fun start() {
        client.start()
    }

    @ReactMethod
    fun stop() {
        client.stop()
    }
}
