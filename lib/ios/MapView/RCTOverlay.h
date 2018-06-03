#import <BaiduMapAPI_Map/BMKOverlayView.h>
#import "RCTMapView.h"

@interface RCTOverlay : UIView

@property (nonatomic, weak) RCTMapView *mapView;

- (id <BMKOverlay>)overlay;
- (BMKOverlayView *)overlayView;
- (void)update;

@end
