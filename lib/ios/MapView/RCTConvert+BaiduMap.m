#import <React/RCTConvert.h>
#import <React/RCTConvert+CoreLocation.h>
#import "Coordinate.h"

@implementation RCTConvert(BaiduMap)

+ (Coordinate *)Coordinate:(id)json {
    return [[Coordinate alloc] initWithCoordinate:[self CLLocationCoordinate2D:json]];
}

RCT_ARRAY_CONVERTER(Coordinate)

@end
