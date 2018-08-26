package cn.qiuxiang.react.baidumap.modules

import cn.qiuxiang.react.baidumap.toLatLng
import cn.qiuxiang.react.baidumap.toWritableMap
import com.baidu.mapapi.search.core.SearchResult
import com.baidu.mapapi.search.geocode.*
import com.facebook.react.bridge.*

@Suppress("unused")
class BaiduMapGeocodeModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    private var promise: Promise? = null
    private val geoCoder by lazy {
        val geoCoder = GeoCoder.newInstance()
        geoCoder.setOnGetGeoCodeResultListener(object : OnGetGeoCoderResultListener {
            override fun onGetGeoCodeResult(result: GeoCodeResult?) {
                if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
                    // TODO: provide error message
                    promise?.reject("", "")
                } else {
                    val data = Arguments.createMap()
                    data.putString("address", result.address)
                    data.putDouble("latitude", result.location.latitude)
                    data.putDouble("longitude", result.location.longitude)
                    promise?.resolve(data)
                }
                promise = null
            }

            override fun onGetReverseGeoCodeResult(result: ReverseGeoCodeResult?) {
                if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
                    // TODO: provide error message
                    promise?.reject("", "")
                } else {
                    val data = result.location.toWritableMap()
                    data.putString("country", result.addressDetail.countryName)
                    data.putString("countryCode", result.addressDetail.countryCode.toString())
                    data.putString("province", result.addressDetail.province)
                    data.putString("city", result.addressDetail.city)
                    data.putString("cityCode", result.cityCode.toString())
                    data.putString("district", result.addressDetail.district)
                    data.putString("street", result.addressDetail.street)
                    data.putString("streetNumber", result.addressDetail.streetNumber)
                    data.putString("adCode", result.addressDetail.adcode.toString())
                    data.putString("businessCircle", result.businessCircle)
                    data.putString("address", result.address)
                    data.putString("description", result.sematicDescription)
                    promise?.resolve(data)
                }
                promise = null
            }
        })
        geoCoder
    }

    override fun getName(): String {
        return "BaiduMapGeocode"
    }

    override fun canOverrideExistingModule(): Boolean {
        return true
    }

    @ReactMethod
    fun search(address: String, city: String, promise: Promise) {
        if (this.promise == null) {
            this.promise = promise
            geoCoder.geocode(GeoCodeOption().address(address).city(city))
        } else {
            promise.reject("", "This callback type only permits a single invocation from native code")
        }
    }

    @ReactMethod
    fun reverse(coordinate: ReadableMap, promise: Promise) {
        if (this.promise == null) {
            this.promise = promise
            geoCoder.reverseGeoCode(ReverseGeoCodeOption().location(coordinate.toLatLng()))
        } else {
            promise.reject("", "This callback type only permits a single invocation from native code")
        }
    }
}
