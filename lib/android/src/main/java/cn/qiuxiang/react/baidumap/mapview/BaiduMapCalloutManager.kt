package cn.qiuxiang.react.baidumap.mapview

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

class BaiduMapCalloutManager : ViewGroupManager<BaiduMapCallout>() {
    override fun getName(): String {
        return "BaiduMapCallout"
    }

    override fun createViewInstance(context: ThemedReactContext): BaiduMapCallout {
        return BaiduMapCallout(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
                "onPress", MapBuilder.of("registrationName", "onPress")
        )
    }
}
