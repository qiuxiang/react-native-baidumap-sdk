#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <BaiduMapAPI_Location/BMKLocationComponent.h>
#import "UserLocation.h"

@interface RCTLocationModule : RCTEventEmitter <RCTBridgeModule, BMKLocationServiceDelegate>
@end

@implementation RCTLocationModule {
    BMKLocationService *_service;
    UserLocation *_location;
    BOOL _initialized;
    BOOL _auto;
    BOOL _reGeocode;
}

RCT_EXPORT_MODULE(BaiduMapLocation)

RCT_EXPORT_METHOD(setOptions:(NSDictionary *)options) {
    if (options[@"minDistance"]) {
        _service.distanceFilter = [options[@"minDistance"] doubleValue];
    }
    
    if (options[@"auto"]) {
        _auto = [options[@"auto"] boolValue];
        if (!_auto) {
            [_service stopUserLocationService];
        }
    }
    
    if (options[@"reGeocode"]) {
        _reGeocode = [options[@"reGeocode"] boolValue];
    }
}

RCT_REMAP_METHOD(init, initWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_initialized) {
        _initialized = YES;
        _location = [UserLocation new];
        dispatch_async(dispatch_get_main_queue(), ^{
            _service = [BMKLocationService new];
            _service.delegate = self;
            resolve(nil);
        });
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(start) {
    [_service startUserLocationService];
}

RCT_EXPORT_METHOD(stop) {
    [_service stopUserLocationService];
}

RCT_EXPORT_METHOD(request) {
    [_service startUserLocationService];
}

- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation {
    [_location updateWithCLLocation:userLocation.location];
    [self sendEventWithName:@"baiduMapLocation" body: _location.json];
    if (!_auto) {
        [_service stopUserLocationService];
    }
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"baiduMapLocation"];
}

@end
