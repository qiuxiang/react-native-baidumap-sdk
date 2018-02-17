#import <React/RCTUIManager.h>
#import "RCTPolygon.h"

@interface RCTPolygonManager : RCTViewManager
@end

@implementation RCTPolygonManager

RCT_EXPORT_MODULE(BaiduMapPolygon)

- (UIView *)view {
    return [RCTPolygon new];
}

RCT_EXPORT_VIEW_PROPERTY(points, RCTCoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
