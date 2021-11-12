extension NSDictionary {
  var coordinate: CLLocationCoordinate2D {
    CLLocationCoordinate2DMake(self["latitude"] as! Double, self["longitude"] as! Double)
  }

  var point: CGPoint {
    CGPoint(x: self["x"] as! Double, y: self["y"] as! Double)
  }
}

extension CLLocationCoordinate2D {
  var json: [String: Double] {
    ["latitude": latitude, "longitude": longitude]
  }
}

extension BMKCoordinateRegion {
  var json: [String: Any] {
    [
      "southwest": [
        "latitude": center.latitude - span.latitudeDelta / 2,
        "longitude": center.longitude - span.longitudeDelta / 2,
      ],
      "northeast": [
        "latitude": center.latitude + span.latitudeDelta / 2,
        "longitude": center.longitude + span.longitudeDelta / 2,
      ],
    ]
  }
}

extension BMKMapStatus {
  var json: [String: Any] {
    [
      "target": targetGeoPt.json,
      "zoom": fLevel,
      "bearing": fRotation,
      "tilt": fOverlooking,
    ]
  }
}

extension BMKMapView {
  var cameraEvent: [String: Any] {
    [
      "cameraPosition": getMapStatus().json,
      "latLngBounds": region.json,
    ]
  }
}

extension RCTConvert {
  @objc static func BMKMapType(_ json: Any) -> BMKMapType {
    BaiduMapAPI_Base.BMKMapType(rawValue: ((json as! UInt) + 1) % 3)!
  }
}

extension RCTImageLoader {
  func loadImage(_ icon: NSDictionary?, callback: @escaping (UIImage) -> Void) {
    if icon == nil {
      return
    }
    let width = icon?["width"] as? Double ?? 0
    let height = icon?["height"] as? Double ?? 0
    loadImage(
      with: RCTConvert.nsurlRequest(icon),
      size: CGSize(width: width, height: height),
      scale: RCTScreenScale(),
      clipped: false,
      resizeMode: RCTResizeMode.cover,
      progressBlock: { _, _ in },
      partialLoad: { _ in },
      completionBlock: { _, image in
        if image != nil {
          DispatchQueue.main.async {
            callback(image!)
          }
        }
      }
    )
  }
}
