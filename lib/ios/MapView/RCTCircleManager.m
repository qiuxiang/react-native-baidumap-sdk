#import <React/RCTUIManager.h>
#import "RCTCircle.h"

@interface RCTCircleManager : RCTViewManager
@end

@implementation RCTCircleManager

RCT_EXPORT_MODULE(BaiduMapCircle)

- (UIView *)view {
    return [RCTCircle new];
}

RCT_REMAP_VIEW_PROPERTY(center, circleCenter, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(radius, CLLocationDistance)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
