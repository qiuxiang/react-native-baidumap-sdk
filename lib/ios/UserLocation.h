#import <BaiduMapAPI_Location/BMKLocationComponent.h>

@interface UserLocation : BMKUserLocation

- (instancetype)initWithCLLocation:(CLLocation *)cllocation;
- (void)updateWithCLLocation:(CLLocation *)cllocation;
- (id)json;

@end
