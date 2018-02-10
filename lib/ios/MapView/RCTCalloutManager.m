#import <React/RCTUIManager.h>
#import "RCTCallout.h"

@interface RCTCalloutManager : RCTViewManager
@end

@implementation RCTCalloutManager

RCT_EXPORT_MODULE(BaiduMapCallout)

- (UIView *)view {
    return [RCTCallout new];
}

@end
