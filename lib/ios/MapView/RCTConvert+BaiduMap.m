#import <React/RCTConvert+CoreLocation.h>
#import "Coordinate.h"
#import "UserLocation.h"

@implementation RCTConvert(BaiduMap)

+ (Coordinate *)Coordinate:(id)json {
    return [[Coordinate alloc] initWithCoordinate:[self CLLocationCoordinate2D:json]];
}

+ (UserLocation *)UserLocation:(id)json {
    CLLocationCoordinate2D coordinate = CLLocationCoordinate2DMake(
        [json[@"latitude"] doubleValue], [json[@"longitude"] doubleValue]);
    CLLocation *cllocation = [[CLLocation alloc] initWithCoordinate:coordinate
                                                           altitude:[json[@"altitude"] doubleValue]
                                                 horizontalAccuracy:[json[@"accuracy"] doubleValue]
                                                   verticalAccuracy:0
                                                          timestamp:[NSDate new]];
    return [[UserLocation alloc] initWithCLLocation:cllocation];
}

RCT_ARRAY_CONVERTER(Coordinate)

@end
