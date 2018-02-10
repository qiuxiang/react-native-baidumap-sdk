#import <BaiduMapAPI_Map/BMKOverlayView.h>

@interface RCTOverlay : UIView

- (id <BMKOverlay>)overlay;
- (BMKOverlayView *)overlayView;

@end
