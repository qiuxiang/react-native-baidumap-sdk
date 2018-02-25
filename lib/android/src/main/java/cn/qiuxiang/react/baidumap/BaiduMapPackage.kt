package cn.qiuxiang.react.baidumap

import cn.qiuxiang.react.baidumap.mapview.*
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class BaiduMapPackage : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
        return listOf(
                BaiduMapLocationModule(context),
                BaiduMapGeocodeModule(context),
                BaiduMapSDKModule(context)
        )
    }

    override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
                BaiduMapViewManager(),
                BaiduMapMarkerManager(),
                BaiduMapCalloutManager(),
                BaiduMapPolygonManager(),
                BaiduMapTextManager()
        )
    }
}
