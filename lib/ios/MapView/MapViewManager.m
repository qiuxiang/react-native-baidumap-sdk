#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(BaiduMapViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(mapType, BMKMapType)
RCT_EXPORT_VIEW_PROPERTY(initialCameraPosition, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(buildingsEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(trafficEnabled, BOOL)

RCT_REMAP_VIEW_PROPERTY(minZoom, minZoomLevel, float)
RCT_REMAP_VIEW_PROPERTY(maxZoom, maxZoomLevel, float)
RCT_REMAP_VIEW_PROPERTY(myLocationEnabled, showsUserLocation, BOOL)
RCT_REMAP_VIEW_PROPERTY(indoorViewEnabled, baseIndoorMapEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(scaleControlsEnabled, showMapScaleBar, BOOL)
RCT_REMAP_VIEW_PROPERTY(scrollGesturesEnabled, scrollEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(zoomGesturesEnabled, zoomEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(rotateGesturesEnabled, rotateEnabled, BOOL)
RCT_REMAP_VIEW_PROPERTY(tiltGesturesEnabled, overlookEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPressPoi, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraIdle, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraMove, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoad, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLocation, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCallback, RCTBubblingEventBlock)

RCT_EXTERN_METHOD(moveCamera:(nonnull NSNumber *)reactTag position:(NSDictionary *)_ duration:(int)_)
RCT_EXTERN_METHOD(call:(nonnull NSNumber *)reactTag callerId:(double)_ name:(NSString *)_ args:(NSDictionary *)_)

@end
