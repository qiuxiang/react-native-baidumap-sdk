#import <React/RCTBridgeModule.h>
#import <BaiduMapAPI_Base/BMKMapManager.h>

@interface RCTInitializerModule : NSObject <RCTBridgeModule, BMKGeneralDelegate>
@end

@implementation RCTInitializerModule {
    BMKMapManager *_manager;
    RCTPromiseResolveBlock _resolve;
    RCTPromiseRejectBlock _reject;
}

RCT_EXPORT_MODULE(BaiduMapInitializer)

RCT_REMAP_METHOD(init, key:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_manager) {
        _manager = [BMKMapManager new];
    }
    
    _resolve = resolve;
    _reject = reject;
    [_manager start:key generalDelegate:self];
}

- (void)onGetPermissionState:(int)error {
    if (error) {
        // TODO: provide error message
        _reject([NSString stringWithFormat:@"%d", error], @"", nil);
    } else {
        _resolve(nil);
    }
}

@end
