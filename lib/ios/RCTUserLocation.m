#import "RCTUserLocation.h"

@implementation RCTUserLocation

@synthesize location;

- (instancetype)initWithCLLocation:(CLLocation *)cllocation {
    self = [super init];
    location = cllocation;
    return self;
}

- (void)updateWithCLLocation:(CLLocation *)cllocation {
    location = cllocation;
}

- (id)json {
    return @{
        @"latitude": @(location.coordinate.latitude),
        @"longitude": @(location.coordinate.longitude),
        @"altitude": @(location.altitude),
        @"timestamp": @(location.timestamp.timeIntervalSince1970),
        @"accuracy": @(location.horizontalAccuracy),
        @"speed": @(location.speed),
        @"direction": @(location.course),
    };
}

@end
