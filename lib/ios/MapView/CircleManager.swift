@objc(BaiduMapCircleManager)
class BaiduMapCircleManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Circle() }
}

class Circle: UIView, Overlay {
  var overlay = BMKCircle()
  var view: BMKCircleView?

  @objc var radius = 0.0 { didSet { overlay.radius = radius } }
  @objc var strokeWidth = 1.0 { didSet { view?.lineWidth = strokeWidth } }
  @objc var strokeColor = UIColor.black { didSet { view?.strokeColor = strokeColor } }
  @objc var fillColor = UIColor.white { didSet { view?.fillColor = fillColor } }

  @objc func setCircleCenter(_ center: CLLocationCoordinate2D) {
    overlay.coordinate = center
  }

  func getOverlay() -> BMKOverlay { overlay }
  func getView() -> BMKOverlayView {
    if view == nil {
      view = BMKCircleView(circle: overlay)
      view?.fillColor = fillColor
      view?.strokeColor = strokeColor
      view?.lineWidth = strokeWidth
    }
    return view!
  }
}
