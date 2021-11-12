@objc(BaiduMapPolygonManager)
class BaiduMapPolygonManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Polygon() }
}

class Polygon: UIView, Overlay {
  var overlay = BMKPolygon()
  var view: BMKPolygonView?

  @objc var strokeWidth = 1.0 { didSet { view?.lineWidth = strokeWidth } }
  @objc var strokeColor = UIColor.black { didSet { view?.strokeColor = strokeColor } }
  @objc var fillColor = UIColor.white { didSet { view?.fillColor = fillColor } }

  @objc func setPoints(_ points: NSArray) {
    var coordinates = points.map { it -> CLLocationCoordinate2D in (it as! NSDictionary).coordinate }
    overlay.setPolygonWithCoordinates(&coordinates, count: points.count)
  }

  func getOverlay() -> BMKOverlay { overlay }
  func getView() -> BMKOverlayView {
    if view == nil {
      view = BMKPolygonView(polygon: overlay)
      view?.fillColor = fillColor
      view?.strokeColor = strokeColor
      view?.lineWidth = strokeWidth
    }
    return view!
  }
}
