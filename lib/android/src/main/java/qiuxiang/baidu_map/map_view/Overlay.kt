package qiuxiang.baidu_map.map_view

import com.baidu.mapapi.map.BaiduMap

interface Overlay {
  fun add(map: BaiduMap)
  fun remove()
}