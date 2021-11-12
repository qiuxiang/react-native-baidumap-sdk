#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(BaiduMapPolygonManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(points, NSArray)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, double)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)

@end
