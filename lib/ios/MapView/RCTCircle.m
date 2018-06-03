#import <BaiduMapAPI_Map/BMKCircleView.h>
#import "RCTCircle.h"
#import "RCTCoordinate.h"

@implementation RCTCircle {
    BMKCircle *_circle;
    BMKCircleView *_circleView;
}

- (instancetype)init {
    _circle = [BMKCircle new];
    _circleView = [[BMKCircleView alloc] initWithCircle:_circle];
    _circleView.strokeColor = UIColor.redColor;
    _circleView.lineWidth = 1;
    self = [super init];
    return self;
}

- (void)setCircleCenter:(CLLocationCoordinate2D)center {
    _circle.coordinate = center;
    [self update];
}

- (void)setRadius:(CLLocationDistance)radius {
    _circle.radius = radius;
    [self update];
}

- (void)setStrokeWidth:(CGFloat)strokeWidth {
    _circleView.lineWidth = strokeWidth;
    [self update];
}

- (void)setStrokeColor:(UIColor *)strokeColor {
    _circleView.strokeColor = strokeColor;
    [self update];
}

- (void)setFillColor:(UIColor *)fillColor {
    _circleView.fillColor = fillColor;
    [self update];
}

- (id <BMKOverlay>)overlay {
    return _circle;
}

- (BMKOverlayView *)overlayView {
    return _circleView;
}

@end

