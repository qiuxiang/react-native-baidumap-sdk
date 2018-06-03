#import "RCTOverlay.h"

@implementation RCTOverlay

- (id <BMKOverlay>)overlay {
    return nil;
}

- (BMKOverlayView *)overlayView {
    return nil;
}

- (void)update {
    _mapView.centerCoordinate = _mapView.centerCoordinate;
}

@end
