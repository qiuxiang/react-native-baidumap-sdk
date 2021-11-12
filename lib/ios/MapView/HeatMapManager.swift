@objc(BaiduMapHeatMapManager)
class BaiduMapHeatMapManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { HeatMap() }
}

class HeatMap: UIView {
  var overlay = BMKHeatMap()

  @objc func setRadius(_ radius: Int32) { overlay.mRadius = radius }
  @objc func setOpacity(_ opacity: Double) { overlay.mOpacity = opacity }
  @objc func setData(_ data: NSArray) {
    overlay.mData = NSMutableArray(array: data.map { it -> BMKHeatMapNode in
      let item = BMKHeatMapNode()
      item.pt = (it as! NSDictionary).coordinate
      item.intensity = 1
      return item
    })
  }
}
