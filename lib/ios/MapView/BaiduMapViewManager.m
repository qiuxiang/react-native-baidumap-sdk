#import <React/RCTUIManager.h>
#import "BaiduMapView.h"

@interface BaiduMapViewManager : RCTViewManager
@end

@implementation BaiduMapViewManager

- (UIView *)view {
    return [BaiduMapView new];
}

RCT_EXPORT_MODULE()

RCT_REMAP_VIEW_PROPERTY(center, centerCoordinate, CLLocationCoordinate2D)
RCT_REMAP_VIEW_PROPERTY(zoomLevel, zoom, float)
RCT_EXPORT_VIEW_PROPERTY(overlook, int)
RCT_EXPORT_VIEW_PROPERTY(rotation, int)

RCT_EXPORT_VIEW_PROPERTY(minZoomLevel, float)
RCT_EXPORT_VIEW_PROPERTY(maxZoomLevel, float)

RCT_EXPORT_VIEW_PROPERTY(satellite, BOOL)
RCT_EXPORT_VIEW_PROPERTY(baiduHeatMapEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(trafficEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(buildingsDisabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(indoorEnabled, baseIndoorMapEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(overlookDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(rotateDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomDisabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(compassDisabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scaleBarDisabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onBaiduMapLoad, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBaiduMapClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBaiduMapLongClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBaiduMapDoubleClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBaiduMapStatusChange, RCTBubblingEventBlock)

@end
