package cn.qiuxiang.react.baidumap.modules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.baidu.mapapi.SDKInitializer.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

@Suppress("unused")
class BaiduMapInitializerModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    class SDKReceiver(promise: Promise) : BroadcastReceiver() {
        private var promise: Promise? = promise

        override fun onReceive(context: Context, intent: Intent) {
            if (intent.action == SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_OK) {
                promise?.resolve(null)
            } else {
                val code = intent.getIntExtra(SDK_BROADTCAST_INTENT_EXTRA_INFO_KEY_ERROR_CODE, 0)
                promise?.reject(code.toString(), intent.action)
            }
        }
    }

    private val emitter by lazy { context.getJSModule(RCTDeviceEventEmitter::class.java) }

    override fun getName(): String {
        return "BaiduMapInitializer"
    }

    override fun canOverrideExistingModule(): Boolean {
        return true
    }

    @ReactMethod
    fun init(promise: Promise) {
        val intentFilter = IntentFilter()
        intentFilter.addAction(SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_OK)
        intentFilter.addAction(SDK_BROADTCAST_ACTION_STRING_PERMISSION_CHECK_ERROR)
        context.currentActivity?.registerReceiver(SDKReceiver(promise), intentFilter)
        // TODO: try catch initialize 失败的情况，通常是因为没有设置 app key
        initialize(context.applicationContext)
    }
}
