#import <BaiduMapAPI_Map/BMKPolygonView.h>
#import "RCTPolygon.h"
#import "RCTCoordinate.h"

@implementation RCTPolygon {
    BMKPolygon *_polygon;
    BMKPolygonView *_polygonView;
}

- (instancetype)init {
    _polygon = [BMKPolygon new];
    _polygonView = [[BMKPolygonView alloc] initWithPolygon:_polygon];
    _polygonView.strokeColor = UIColor.redColor;
    _polygonView.lineWidth = 1;
    self = [super init];
    return self;
}

- (void)setPoints:(NSArray<RCTCoordinate *> *)points {
    CLLocationCoordinate2D coordinates[points.count];
    for (NSUInteger i = 0; i < points.count; i++) {
        coordinates[i] = points[i].coordinate;
    }
    [_polygon setPolygonWithCoordinates:coordinates count:points.count];
}

- (void)setStrokeWidth:(CGFloat)strokeWidth {
    _polygonView.lineWidth = strokeWidth;
}

- (void)setStrokeColor:(UIColor *)strokeColor {
    _polygonView.strokeColor = strokeColor;
}

- (void)setFillColor:(UIColor *)fillColor {
    _polygonView.fillColor = fillColor;
}

- (id <BMKOverlay>)overlay {
    return _polygon;
}

- (BMKOverlayView *)overlayView {
    return _polygonView;
}

@end

