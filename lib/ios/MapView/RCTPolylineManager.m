#import <React/RCTUIManager.h>
#import "RCTPolyline.h"

@interface RCTPolylineManager : RCTViewManager
@end

@implementation RCTPolylineManager

RCT_EXPORT_MODULE(BaiduMapPolyline)

- (UIView *)view {
    return [RCTPolyline new];
}

RCT_EXPORT_VIEW_PROPERTY(points, RCTCoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(width, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(colors, UIColorArray)

@end
