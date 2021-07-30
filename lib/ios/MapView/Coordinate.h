#import <CoreLocation/CoreLocation.h>

@interface Coordinate : NSObject

@property(nonatomic, assign) CLLocationCoordinate2D coordinate;

- (instancetype)initWithCoordinate:(CLLocationCoordinate2D)coordinate;

@end
