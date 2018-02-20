#import <React/RCTBridgeModule.h>
#import <BaiduMapAPI_Search/BMKGeocodeSearch.h>

@interface RCTGeocodeModule : NSObject <RCTBridgeModule, BMKGeoCodeSearchDelegate>
@end

@implementation RCTGeocodeModule {
    BMKGeoCodeSearch *_search;
    RCTPromiseResolveBlock _resolve;
    RCTPromiseRejectBlock _reject;
}

- (instancetype)init {
    self = [super init];
    _search = [BMKGeoCodeSearch new];
    _search.delegate = self;
    return self;
}

RCT_EXPORT_MODULE(BaiduMapGeocode)

RCT_EXPORT_METHOD(search:(NSString *)address
                    city:(NSString *)city
      searchWithResolver:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject) {
    BMKGeoCodeSearchOption *option = [BMKGeoCodeSearchOption new];
    option.city = city;
    option.address = address;
    _resolve = resolve;
    _reject = reject;
    [_search geoCode:option];
}

RCT_EXPORT_METHOD(reverse:(CLLocationCoordinate2D)coordinate) {
    ;
}

- (void)onGetGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error {
    if (error == BMK_SEARCH_NO_ERROR) {
        _resolve(@{
            @"latitude": @(result.location.latitude),
            @"longitude": @(result.location.longitude),
            @"address": result.address,
        });
    } else {
        // TODO: provide error message
        _reject(@"", @"", nil);
    }
}

@end
