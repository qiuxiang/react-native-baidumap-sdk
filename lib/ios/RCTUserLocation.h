#import <BaiduMapAPI_Search/BMKGeocodeType.h>
#import <BaiduMapAPI_Location/BMKLocationComponent.h>

@interface RCTUserLocation : BMKUserLocation

- (instancetype)initWithCLLocation:(CLLocation *)cllocation;
- (void)updateWithCLLocation:(CLLocation *)cllocation;
- (void)updateWithReGeoCodeResult:(BMKReverseGeoCodeResult *)result;
- (id)json;

@end
