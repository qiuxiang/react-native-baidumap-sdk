package cn.qiuxiang.react.baidumap.mapview

import com.baidu.mapapi.map.BaiduMap

interface BaiduMapOverlay {
    fun addTo(map: BaiduMap)
    fun remove()
}
