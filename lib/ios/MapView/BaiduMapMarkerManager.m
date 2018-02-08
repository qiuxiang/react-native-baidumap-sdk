#import <React/RCTViewManager.h>
#import "BaiduMapMarker.h"

@interface BaiduMapMarkerManager : RCTViewManager
@end

@implementation BaiduMapMarkerManager

- (UIView *)view {
    return [BaiduMapMarker new];
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(coordinate, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(image, NSString)
RCT_EXPORT_VIEW_PROPERTY(selected, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onBaiduMapPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBaiduMapCalloutPress, RCTBubblingEventBlock)

@end
