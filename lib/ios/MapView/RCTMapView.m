#import <React/UIView+React.h>
#import "RCTMapView.h"
#import "RCTMarker.h"
#import "RCTOverlay.h"
#import "RCTHeatMap.h"
#import "RCTUserLocation.h"

@implementation RCTMapView {
    NSMutableDictionary *_markers;
    NSMutableDictionary *_overlays;
}

- (instancetype)init {
    _markers = [NSMutableDictionary new];
    _overlays = [NSMutableDictionary new];
    self = [super init];
    self.delegate = self;
    self.showMapScaleBar = YES;
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
    if (disabled) {
        self.compassPosition = CGPointMake(999, 0);
    } else {
        self.compassPosition = CGPointMake(5, 5);
    }
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

- (void)setLocation:(RCTUserLocation *)userLocation {
    [self updateLocationData:userLocation];
}

- (void)mapViewDidFinishLoading:(RCTMapView *)mapView {
    self.compassPosition = CGPointMake(5, 5);
    self.mapScaleBarPosition = CGPointMake(2, self.frame.size.height - 43);

    if (self.onBaiduMapLoad) {
        self.onBaiduMapLoad(nil);
    }
}

- (void)mapView:(RCTMapView *)mapView onClickedMapBlank:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapClick) {
        self.onBaiduMapClick(@{
            @"latitude": @(coordinate.latitude),
            @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(RCTMapView *)mapView onClickedMapPoi:(BMKMapPoi *)mapPoi {
    if (self.onBaiduMapClick) {
        self.onBaiduMapClick(@{
            @"latitude": @(mapPoi.pt.latitude),
            @"longitude": @(mapPoi.pt.longitude),
            @"uid": mapPoi.uid,
            @"name": mapPoi.text,
        });
    }
}

- (void)mapview:(RCTMapView *)mapView onLongClick:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapLongClick) {
        self.onBaiduMapLongClick(@{
           @"latitude": @(coordinate.latitude),
           @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapview:(RCTMapView *)mapView onDoubleClick:(CLLocationCoordinate2D)coordinate {
    if (self.onBaiduMapDoubleClick) {
        self.onBaiduMapDoubleClick(@{
           @"latitude": @(coordinate.latitude),
           @"longitude": @(coordinate.longitude),
        });
    }
}

- (void)mapView:(RCTMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
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

- (BMKAnnotationView *)mapView:(RCTMapView *)mapView viewForAnnotation:(id<BMKAnnotation>)annotation {
    if ([annotation isKindOfClass:[RCTMarker class]]) {
        RCTMarker *marker = (RCTMarker *)annotation;
        return marker.annotationView;
    }
    return nil;
}

- (BMKOverlayView *)mapView:(RCTMapView *)mapView viewForOverlay:(id <BMKOverlay>)overlay {
    RCTOverlay *o = [self getOverlay:overlay];
    return o.overlayView;
}

- (void)mapView:(RCTMapView *)mapView didSelectAnnotationView:(BMKAnnotationView *)view {
    RCTMarker *marker = [self getMarker:view.annotation];
    [marker bindCalloutPressHandler];
}

- (void)mapView:(BMKMapView *)mapView
 annotationView:(BMKAnnotationView *)view
didChangeDragState:(BMKAnnotationViewDragState)newState
   fromOldState:(BMKAnnotationViewDragState)oldState {
    RCTMarker *marker = [self getMarker:view.annotation];

    id coordinate = @{
        @"latitude": @(view.annotation.coordinate.latitude),
        @"longitude": @(view.annotation.coordinate.longitude),
    };

    if (newState == BMKAnnotationViewDragStateStarting && marker.onBaiduMapDragStart) {
        marker.onBaiduMapDragStart(coordinate);
    }

    if (newState == BMKAnnotationViewDragStateDragging && marker.onBaiduMapDrag) {
        marker.onBaiduMapDrag(coordinate);
    }

    if (newState == BMKAnnotationViewDragStateEnding && marker.onBaiduMapDragEnd) {
        marker.onBaiduMapDragEnd(coordinate);
    }
}

- (RCTMarker *)getMarker:(id <BMKAnnotation>)annotation {
    return _markers[[@(annotation.hash) stringValue]];
}

- (RCTOverlay *)getOverlay:(id <BMKOverlay>)overlay {
    return _overlays[[@(overlay.hash) stringValue]];
}

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[RCTMarker class]]) {
        RCTMarker *marker = (RCTMarker *)subview;
        marker.mapView = self;
        _markers[[@(marker.hash) stringValue]] = marker;
        [self addAnnotation:marker];
    }

    if ([subview isKindOfClass:[RCTOverlay class]]) {
        RCTOverlay *overlay = (RCTOverlay *)subview;
        overlay.mapView = self;
        _overlays[[@(overlay.overlay.hash) stringValue]] = overlay;
        [self addOverlay:overlay.overlay];
    }
    
    if ([subview isKindOfClass:[RCTHeatMap class]]) {
        [self addHeatMap:((RCTHeatMap *) subview).heatMap];
    }
}

- (void)removeReactSubview:(id <RCTComponent>)subview {
    [super removeReactSubview:(UIView *) subview];

    if ([subview isKindOfClass:[RCTMarker class]]) {
        RCTMarker *marker = (RCTMarker *) subview;
        [_markers removeObjectForKey:[@(marker.annotation.hash) stringValue]];
        [self removeAnnotation:marker];
    }

    if ([subview isKindOfClass:[RCTOverlay class]]) {
        RCTOverlay *overlay = (RCTOverlay *)subview;
        _overlays[[@(overlay.hash) stringValue]] = overlay;
        [self removeOverlay:overlay.overlay];
    }
    
    if ([subview isKindOfClass:[RCTHeatMap class]]) {
        [self removeHeatMap];
    }
}

@end
