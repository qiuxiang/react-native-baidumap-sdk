#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface BaiduMapLocation : RCTEventEmitter <RCTBridgeModule>
@end

@implementation BaiduMapLocation

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"baiduMapLocation"];
}

@end