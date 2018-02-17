#import <React/RCTConvert+CoreLocation.h>
#import "RCTCoordinate.h"
#import "RCTUserLocation.h"

@implementation RCTConvert(BaiduMap)

+ (RCTCoordinate *)RCTCoordinate:(id)json {
    return [[RCTCoordinate alloc] initWithCoordinate:[self CLLocationCoordinate2D:json]];
}

+ (RCTUserLocation *)RCTUserLocation:(id)json {
    CLLocationCoordinate2D coordinate = CLLocationCoordinate2DMake(
        [json[@"latitude"] doubleValue], [json[@"longitude"] doubleValue]);
    CLLocation *cllocation = [[CLLocation alloc] initWithCoordinate:coordinate
                                                           altitude:[json[@"altitude"] doubleValue]
                                                 horizontalAccuracy:[json[@"accuracy"] doubleValue]
                                                   verticalAccuracy:0
                                                          timestamp:[NSDate new]];
    return [[RCTUserLocation alloc] initWithCLLocation:cllocation];
}

RCT_ARRAY_CONVERTER(RCTCoordinate)

@end
