#import <CoreLocation/CoreLocation.h>

@interface RCTCoordinate : NSObject

@property(nonatomic, assign) CLLocationCoordinate2D coordinate;

- (instancetype)initWithCoordinate:(CLLocationCoordinate2D)coordinate;

@end
