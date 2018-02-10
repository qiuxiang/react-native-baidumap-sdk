#import <React/RCTUIManager.h>
#import "BaiduMapPolygon.h"

@interface BaiduMapPolygonManager : RCTViewManager
@end

@implementation BaiduMapPolygonManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [BaiduMapPolygon new];
}

RCT_EXPORT_VIEW_PROPERTY(points, CoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
