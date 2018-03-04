#import "RCTHeatMap.h"

@implementation RCTHeatMap {
    BMKHeatMap *_heatMap;
}

- (instancetype)init {
    self = [super init];
    _heatMap = [BMKHeatMap new];
    return self;
}

- (void)setPoints:(NSArray<BMKHeatMapNode *> *)points {
    _heatMap.mData = [NSMutableArray arrayWithArray:points];
}

- (void)setRadius:(int)radius {
    _heatMap.mRadius = radius;
}

- (void)setOpacity:(double)opacity {
    _heatMap.mOpacity = opacity;
}

- (BMKHeatMap *)heatMap {
    return _heatMap;
}

@end
