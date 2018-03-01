#import <React/RCTUIManager.h>
#import "RCTHeatMap.h"

@interface RCTHeatMapManager : RCTViewManager
@end

@implementation RCTHeatMapManager

RCT_EXPORT_MODULE(BaiduMapHeatMap)

- (UIView *)view {
    return [RCTHeatMap new];
}

RCT_EXPORT_VIEW_PROPERTY(points, BMKHeatMapNodeArray)
RCT_EXPORT_VIEW_PROPERTY(radius, int)
RCT_EXPORT_VIEW_PROPERTY(opacity, double)

@end
