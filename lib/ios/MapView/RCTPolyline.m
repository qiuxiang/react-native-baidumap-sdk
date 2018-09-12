#import <BaiduMapAPI_Map/BMKPolylineView.h>
#import "RCTPolyline.h"
#import "RCTCoordinate.h"

@implementation RCTPolyline {
    BMKPolyline *_polyline;
    BMKPolylineView *_polylineView;
}

- (instancetype)init {
    _polyline = [BMKPolyline new];
    _polylineView = [[BMKPolylineView alloc] initWithPolyline:_polyline];
    _polylineView.strokeColor = UIColor.redColor;
    _polylineView.lineWidth = 1;
    self = [super init];
    return self;
}

- (void)setPoints:(NSArray<RCTCoordinate *> *)points {
    CLLocationCoordinate2D coordinates[points.count];
    for (NSUInteger i = 0; i < points.count; i++) {
        coordinates[i] = points[i].coordinate;
    }
    [_polyline setPolylineWithCoordinates:coordinates count:points.count];
    self.mapView.centerCoordinate = self.mapView.centerCoordinate;
}

- (void)setWidth:(CGFloat)width {
    _polylineView.lineWidth = width;
}

- (void)setColor:(UIColor *)color {
    _polylineView.strokeColor = color;
}

- (void)setColors:(NSArray<UIColor *> *)colors {
    _polylineView.colors = colors;
}

- (id <BMKOverlay>)overlay {
    return _polyline;
}

- (BMKOverlayView *)overlayView {
    if (!_polylineView) {
        _polyline = [BMKPolyline new];
        _polylineView = [[BMKPolylineView alloc] initWithPolyline:_polyline];
        _polylineView.strokeColor = UIColor.redColor;
        _polylineView.lineWidth = 1;
    }
    return _polylineView;
}

@end

