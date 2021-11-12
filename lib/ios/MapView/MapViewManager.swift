@objc(BaiduMapViewManager)
class BaiduMapViewManager: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool { false }

  override func view() -> UIView {
    let view = MapView()
    view.delegate = view
    return view
  }

  @objc func moveCamera(_ reactTag: NSNumber, position: NSDictionary, duration: Int) {
    getView(reactTag: reactTag) { view in
      view.moveCamera(position: position, duration: duration)
    }
  }

  @objc func call(_ reactTag: NSNumber, callerId: Double, name: String, args: NSDictionary) {
    getView(reactTag: reactTag) { view in
      view.call(id: callerId, name: name, args: args)
    }
  }

  func getView(reactTag: NSNumber, callback: @escaping (MapView) -> Void) {
    bridge.uiManager.addUIBlock { _, viewRegistry in
      callback(viewRegistry![reactTag] as! MapView)
    }
  }
}

class MapView: BMKMapView, BMKMapViewDelegate {
  var initialized = false
  var overlayMap: [NSObject: Overlay] = [:]
  var markerMap: [BMKPointAnnotation: Marker] = [:]

  @objc var onLoad: RCTBubblingEventBlock = { _ in }
  @objc var onCameraMove: RCTBubblingEventBlock = { _ in }
  @objc var onCameraIdle: RCTBubblingEventBlock = { _ in }
  @objc var onPress: RCTBubblingEventBlock = { _ in }
  @objc var onPressPoi: RCTBubblingEventBlock = { _ in }
  @objc var onLongPress: RCTBubblingEventBlock = { _ in }
  @objc var onLocation: RCTBubblingEventBlock = { _ in }
  @objc var onCallback: RCTBubblingEventBlock = { _ in }

  @objc func setInitialCameraPosition(_ json: NSDictionary) {
    if !initialized {
      initialized = true
      moveCamera(position: json)
    }
  }

  func moveCamera(position: NSDictionary, duration: Int = 0) {
    let status = BMKMapStatus()
    if let it = position["zoom"] as? Float { status.fLevel = it }
    if let it = position["tilt"] as? Float { status.fOverlooking = it }
    if let it = position["bearing"] as? Float { status.fRotation = it }
    if let it = (position["target"] as? NSDictionary)?.coordinate { status.targetGeoPt = it }
    setMapStatus(status, withAnimation: true, withAnimationTime: Int32(duration))
  }

  func call(id: Double, name: String, args: NSDictionary) {
    switch name {
    case "getLatLng":
      callback(id: id, data: convert(args.point, toCoordinateFrom: self).json)
    default:
      break
    }
  }

  func callback(id: Double, data: [String: Any]) {
    onCallback(["id": id, "data": data])
  }

  override func didAddSubview(_ subview: UIView) {
    if let overlay = (subview as? Overlay)?.getOverlay() {
      overlayMap[overlay as! NSObject] = subview as? Overlay
      add(overlay)
    }
    if let annotation = (subview as? Marker)?.annotation, markerMap[annotation] == nil {
      markerMap[annotation] = subview as? Marker
      addAnnotation(annotation)
    }
  }

  override func removeReactSubview(_ subview: UIView!) {
    super.removeReactSubview(subview)
    if let overlay = (subview as? Overlay)?.getOverlay() {
      overlayMap.removeValue(forKey: overlay as! NSObject)
      remove(overlay)
    }
    if let annotation = (subview as? Marker)?.annotation {
      markerMap.removeValue(forKey: annotation)
      removeAnnotations([annotation])
      removeAnnotation(annotation)
    }
  }

  func mapView(_: BMKMapView!, viewFor overlay: BMKOverlay!) -> BMKOverlayView! {
    if let key = overlay as? NSObject {
      return overlayMap[key]?.getView()
    }
    return nil
  }

  func mapView(_: BMKMapView!, viewFor annotation: BMKAnnotation!) -> BMKAnnotationView! {
    if let key = annotation as? BMKPointAnnotation {
      return markerMap[key]?.getView()
    }
    return nil
  }

  func mapView(_: BMKMapView!, annotationView view: BMKAnnotationView!, didChangeDragState newState: UInt, fromOldState _: UInt) {
    if let key = view.annotation as? BMKPointAnnotation {
      let market = markerMap[key]!
      if newState == BMKAnnotationViewDragStateStarting {
        market.onDragStart(nil)
      }
      if newState == BMKAnnotationViewDragStateDragging {
        market.onDrag(nil)
      }
      if newState == BMKAnnotationViewDragStateEnding {
        market.onDragEnd(view.annotation.coordinate.json)
      }
    }
  }

  func mapView(_: BMKMapView!, click view: BMKAnnotationView!) {
    if let key = view.annotation as? BMKPointAnnotation {
      markerMap[key]?.onPress(nil)
    }
  }

  func mapViewDidFinishLoading(_: BMKMapView!) {
    onLoad(nil)
  }

  func mapView(_: BMKMapView!, onClickedMapBlank coordinate: CLLocationCoordinate2D) {
    onPress(coordinate.json)
  }

  func mapView(_: BMKMapView!, onClickedMapPoi mapPoi: BMKMapPoi!) {
    onPressPoi(["name": mapPoi.text!, "id": mapPoi.uid!, "position": mapPoi.pt.json])
  }

  func mapview(_: BMKMapView!, onLongClick coordinate: CLLocationCoordinate2D) {
    onLongPress(coordinate.json)
  }

  func mapView(_: BMKMapView!, regionDidChangeAnimated _: Bool) {
    onCameraIdle(cameraEvent)
  }
}
