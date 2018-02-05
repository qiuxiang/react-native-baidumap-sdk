#import <React/RCTUIManager.h>
#import "BaiduMapView.h"

@interface BaiduMapViewManager : RCTViewManager <BMKMapViewDelegate>
@end

@implementation BaiduMapViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [BaiduMapView new];
}

@end
