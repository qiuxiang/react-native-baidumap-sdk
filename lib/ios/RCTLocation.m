#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCTLocation : RCTEventEmitter <RCTBridgeModule>
@end

@implementation RCTLocation

RCT_EXPORT_MODULE(BaiduMapLocation)

- (NSArray<NSString *> *)supportedEvents {
    return @[@"baiduMapLocation"];
}

@end
