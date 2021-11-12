@objc(BaiduMapPolylineManager)
class BaiduMapPolylineManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }
  override func view() -> UIView { Polyline() }
}

class Polyline: UIView, Overlay {
  var overlay = BMKPolyline()
  var view: BMKPolylineView?

  @objc var width = 1.0 { didSet { view?.lineWidth = width } }
  @objc var color = UIColor.black { didSet { view?.strokeColor = color } }
  @objc var dotted = false { didSet { setDotted() } }

  @objc func setPoints(_ points: NSArray) {
    var coordinates = points.map { it -> CLLocationCoordinate2D in (it as! NSDictionary).coordinate }
    overlay.setPolylineWithCoordinates(&coordinates, count: points.count)
  }

  func setDotted() {
    view?.lineDashType = dotted ? kBMKLineDashTypeDot : kBMKLineDashTypeNone
  }

  func getOverlay() -> BMKOverlay { overlay }
  func getView() -> BMKOverlayView {
    if view == nil {
      view = BMKPolylineView(polyline: overlay)
      view?.strokeColor = color
      view?.lineWidth = width
//      view?.colors = []
      setDotted()
    }
    return view!
  }
}
