#import "UserLocation.h"

@implementation UserLocation {
    BMKReverseGeoCodeResult *_reGeocodeResult;
}

@synthesize location;

- (instancetype)initWithCLLocation:(CLLocation *)cllocation {
    self = [super init];
    location = cllocation;
    return self;
}

- (void)updateWithCLLocation:(CLLocation *)cllocation {
    location = cllocation;
    _reGeocodeResult = nil;
}

- (void)updateWithReGeoCodeResult:(BMKReverseGeoCodeResult *)result {
    _reGeocodeResult = result;
}

- (id)json {
    if (_reGeocodeResult) {
        return @{
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"altitude": @(location.altitude),
            @"timestamp": @(location.timestamp.timeIntervalSince1970),
            @"accuracy": @(location.horizontalAccuracy),
            @"speed": @(location.speed),
            @"country": _reGeocodeResult.addressDetail.country,
            @"countryCode": _reGeocodeResult.addressDetail.countryCode,
            @"province": _reGeocodeResult.addressDetail.province,
            @"city": _reGeocodeResult.addressDetail.city,
            @"cityCode": _reGeocodeResult.cityCode,
            @"street": _reGeocodeResult.addressDetail.streetName,
            @"streetNumber": _reGeocodeResult.addressDetail.streetNumber,
            @"adCode": _reGeocodeResult.addressDetail.adCode,
            @"address": _reGeocodeResult.address,
            @"description": _reGeocodeResult.sematicDescription,
        };
    } else {
        return @{
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"altitude": @(location.altitude),
            @"timestamp": @(location.timestamp.timeIntervalSince1970),
            @"accuracy": @(location.horizontalAccuracy),
            @"speed": @(location.speed),
        };
    }
}

@end
