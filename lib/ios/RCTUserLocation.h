#import <BaiduMapAPI_Location/BMKLocationComponent.h>

@interface RCTUserLocation : BMKUserLocation

- (instancetype)initWithCLLocation:(CLLocation *)cllocation;
- (void)updateWithCLLocation:(CLLocation *)cllocation;
- (id)json;

@end
