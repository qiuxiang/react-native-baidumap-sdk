package qiuxiang.baidu_map.modules

import com.baidu.mapapi.SDKInitializer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

@Suppress("unused")
class SdkModule(val context: ReactApplicationContext) : ReactContextBaseJavaModule() {
  override fun getName(): String {
    return "BaiduMapSdk"
  }

  @ReactMethod
  fun init(apiKey: String?) {
    apiKey?.let {
      SDKInitializer.setApiKey(apiKey)
      SDKInitializer.initialize(context.applicationContext)
    }
  }
}