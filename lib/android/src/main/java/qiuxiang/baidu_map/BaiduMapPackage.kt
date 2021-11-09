package qiuxiang.baidu_map

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import qiuxiang.baidu_map.map_view.*
import qiuxiang.baidu_map.modules.SdkModule

class BaiduMapPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(SdkModule(reactContext))
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(
      MapViewManager(),
      MarkerManager(),
      PolylineManager(),
      PolygonManager(),
      CircleManager(),
      HeatMapManager(),
    )
  }
}
