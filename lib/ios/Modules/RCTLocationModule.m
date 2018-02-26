#import <React/RCTEventEmitter.h>
#import <BaiduMapAPI_Location/BMKLocationComponent.h>
#import "RCTUserLocation.h"

@interface RCTLocationModule : RCTEventEmitter <RCTBridgeModule, BMKLocationServiceDelegate>
@end

@implementation RCTLocationModule {
    BMKLocationService *_service;
    RCTUserLocation *_location;
    BOOL _initialized;
}

RCT_EXPORT_MODULE(BaiduMapLocation)

RCT_EXPORT_METHOD(setOptions:(NSDictionary *)options) {
    if (options[@"distanceFilter"]) {
        _service.distanceFilter = [options[@"distanceFilter"] doubleValue];
    }
}

RCT_REMAP_METHOD(init, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_initialized) {
        _initialized = YES;
        _location = [RCTUserLocation new];
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

- (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation {
    [_location updateWithCLLocation:userLocation.location];
    [self sendEventWithName:@"baiduMapLocation" body: _location.json];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"baiduMapLocation"];
}

@end
