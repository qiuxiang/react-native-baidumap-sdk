#import <React/RCTComponent.h>
#import <BaiduMapAPI_Map/BMKMapView.h>

@interface BaiduMapView : BMKMapView <BMKMapViewDelegate>

@property(nonatomic, copy) RCTBubblingEventBlock onBaiduMapLoad;
@property(nonatomic, copy) RCTBubblingEventBlock onBaiduMapClick;
@property(nonatomic, copy) RCTBubblingEventBlock onBaiduMapLongClick;
@property(nonatomic, copy) RCTBubblingEventBlock onBaiduMapDoubleClick;
@property(nonatomic, copy) RCTBubblingEventBlock onBaiduMapStatusChange;

@end
