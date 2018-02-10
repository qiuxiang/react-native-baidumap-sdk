#import <React/UIView+React.h>
#import "BaiduMapView.h"
#import "BaiduMapMarker.h"
#import "BaiduMapOverlay.h"

@implementation BaiduMapView {
    NSMutableDictionary *_markers;
    NSMutableDictionary *_overlays;
}

- (instancetype)init {
    _markers = [NSMutableDictionary new];
    _overlays = [NSMutableDictionary new];
    self = [super init];
    self.delegate = self;
    return self;
}

- (void)setSatellite:(BOOL)satellite {
    self.mapType = satellite ? BMKMapTypeSatellite : BMKMapTypeStandard;
}

- (void)setBuildingsDisabled:(BOOL)disabled {
    self.buildingsEnabled = !disabled;
}

- (void)setRotateDisabled:(BOOL)disabled {
    self.rotateEnabled = !disabled;
}

- (void)setOverlookDisabled:(BOOL)disabled {
    self.overlookEnabled = !disabled;
}

- (void)setScrollDisabled:(BOOL)disabled {
    self.scrollEnabled = !disabled;
}

- (void)setZoomDisabled:(BOOL)disabled {
    self.zoomEnabled = !disabled;
}

- (void)setCompassDisabled:(BOOL)disabled {
}

- (void)setScaleBarDisabled:(BOOL)disabled {
    self.showMapScaleBar = !disabled;
}

- (void)setZoom:(float)zoomLevel {
    dispatch_async(dispatch_get_main_queue(), ^{
        self.zoomLevel = zoomLevel;
    });
}

- (void)setOverlook:(int)overlook {
    BMKMapStatus *status = [BMKMapStatus new];
    status.fOverlooking = overlook;
    [self setMapStatus:status];
}

- (void)mapViewDidFinishLoading:(BaiduMapView *)mapView {
    if (self.onBaiduMapLoad) {
        self.onBaiduMapLoad(nil);
    }
}

- (void)mapView:(BaiduMapView *)mapView onClickedMapBlank:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapClick) {
        self.onBaiduMapClick(@{
            @"latitude": @(coordinate.latitude),
            @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(BaiduMapView *)mapView onClickedMapPoi:(BMKMapPoi *)mapPoi {
    if (self.onBaiduMapClick) {
        self.onBaiduMapClick(@{
            @"latitude": @(mapPoi.pt.latitude),
            @"longitude": @(mapPoi.pt.longitude),
            @"uid": mapPoi.uid,
            @"name": mapPoi.text,
        });
    }
}

- (void)mapview:(BaiduMapView *)mapView onLongClick:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapLongClick) {
        self.onBaiduMapLongClick(@{
           @"latitude": @(coordinate.latitude),
           @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapview:(BaiduMapView *)mapView onDoubleClick:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapDoubleClick) {
        self.onBaiduMapDoubleClick(@{
           @"latitude": @(coordinate.latitude),
           @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(BaiduMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
    if (self.onBaiduMapStatusChange) {
        self.onBaiduMapStatusChange(@{
            @"center": @{
                @"latitude": @(self.centerCoordinate.latitude),
                @"longitude": @(self.centerCoordinate.longitude),
            },
            @"region": @{
                @"latitude": @(self.region.center.latitude),
                @"longitude": @(self.region.center.longitude),
                @"latitudeDelta": @(self.region.span.latitudeDelta),
                @"longitudeDelta": @(self.region.span.longitudeDelta),
            },
            @"zoomLevel": @(self.zoomLevel),
            @"rotation": @(self.rotation),
            @"overlook": @(self.overlooking),
        });
    }
}

- (BMKAnnotationView *)mapView:(BaiduMapView *)mapView viewForAnnotation:(id<BMKAnnotation>)annotation {
    if ([annotation isKindOfClass:[BaiduMapMarker class]]) {
        BaiduMapMarker *marker = (BaiduMapMarker *)annotation;
        return marker.annotationView;
    }
    return nil;
}

- (BMKOverlayView *)mapView:(BaiduMapView *)mapView viewForOverlay:(id <BMKOverlay>)overlay {
    BaiduMapOverlay *o = [self getOverlay:overlay];
    return o.overlayView;
}

- (void)mapView:(BaiduMapView *)mapView didSelectAnnotationView:(BMKAnnotationView *)view {
    BaiduMapMarker *marker = [self getMarker:view.annotation];
    [marker bindCalloutPressHandler];
}

- (BaiduMapMarker *)getMarker:(id <BMKAnnotation>)annotation {
    return _markers[[@(annotation.hash) stringValue]];
}

- (BaiduMapOverlay *)getOverlay:(id <BMKOverlay>)overlay {
    return _overlays[[@(overlay.hash) stringValue]];
}

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[BaiduMapMarker class]]) {
        BaiduMapMarker *marker = (BaiduMapMarker *)subview;
        marker.mapView = self;
        _markers[[@(marker.hash) stringValue]] = marker;
        [self addAnnotation:marker];
    }
    if ([subview isKindOfClass:[BaiduMapOverlay class]]) {
        BaiduMapOverlay *overlay = (BaiduMapOverlay *)subview;
        _overlays[[@(overlay.overlay.hash) stringValue]] = overlay;
        [self addOverlay:overlay.overlay];
    }
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    [super removeReactSubview:(UIView *) subview];
    if ([subview isKindOfClass:[BaiduMapMarker class]]) {
        BaiduMapMarker *marker = (BaiduMapMarker *) subview;
        [_markers removeObjectForKey:[@(marker.annotation.hash) stringValue]];
        [self removeAnnotation:marker];
    }
    if ([subview isKindOfClass:[BaiduMapOverlay class]]) {
        BaiduMapOverlay *overlay = (BaiduMapOverlay *)subview;
        _overlays[[@(overlay.hash) stringValue]] = overlay;
        [self removeOverlay:overlay.overlay];
    }
}

@end
