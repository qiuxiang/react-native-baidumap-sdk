#import <React/RCTUIManager.h>
#import "BaiduMapCallout.h"

@interface BaiduMapCalloutManager : RCTViewManager
@end

@implementation BaiduMapCalloutManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [BaiduMapCallout new];
}

@end