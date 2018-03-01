package cn.qiuxiang.react.baidumap

import cn.qiuxiang.react.baidumap.mapview.*
import cn.qiuxiang.react.baidumap.modules.BaiduMapGeocodeModule
import cn.qiuxiang.react.baidumap.modules.BaiduMapInitializerModule
import cn.qiuxiang.react.baidumap.modules.BaiduMapLocationModule
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class BaiduMapPackage : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
        return listOf(
                BaiduMapLocationModule(context),
                BaiduMapGeocodeModule(context),
                BaiduMapInitializerModule(context)
        )
    }

    override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
                BaiduMapViewManager(),
                BaiduMapMarkerManager(),
                BaiduMapCalloutManager(),
                BaiduMapPolylineManager(),
                BaiduMapPolygonManager(),
                BaiduMapCircleManager(),
                BaiduMapHeatMapManager(),
                BaiduMapTextManager()
        )
    }
}
