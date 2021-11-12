@objc(BaiduMapSdk)
class BaiduMapSdk: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc func initSdk(_ apiKey: String) {
    BMKMapManager.sharedInstance().start(apiKey, generalDelegate: nil)
  }
}
