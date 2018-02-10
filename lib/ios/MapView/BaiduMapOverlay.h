#import <BaiduMapAPI_Map/BMKOverlayView.h>

@interface BaiduMapOverlay : UIView

- (id <BMKOverlay>)overlay;
- (BMKOverlayView *)overlayView;

@end
