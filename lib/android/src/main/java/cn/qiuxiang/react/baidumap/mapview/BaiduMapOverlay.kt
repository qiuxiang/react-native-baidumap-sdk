package cn.qiuxiang.react.baidumap.mapview

interface BaiduMapOverlay {
    fun addTo(mapView: BaiduMapView)
    fun remove()
}
