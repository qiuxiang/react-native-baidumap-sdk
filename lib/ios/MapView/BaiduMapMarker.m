#import <React/UIView+React.h>
#import "BaiduMapMarker.h"
#import "BaiduMapCallout.h"

@implementation BaiduMapMarker {
    BMKAnnotationView *_annotationView;
    BMKActionPaopaoView *_calloutView;
    UITapGestureRecognizer *_calloutPressHandler;
    BOOL _selected;
}

- (instancetype)init {
    self = [super init];
    _annotationView = [[BMKAnnotationView alloc] initWithAnnotation:self reuseIdentifier:nil];
    _annotationView.image = [UIImage imageNamed:@"marker" inBundle:BaiduMapMarker.bundle compatibleWithTraitCollection:nil];
    [_annotationView addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(_onPress:)]];
    _calloutPressHandler = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(_onCalloutPress:)];
    return self;
}

- (void)bindCalloutPressHandler {
    [_annotationView.paopaoView addGestureRecognizer:_calloutPressHandler];
}

- (void)setColor:(UIColor *)color {
    _annotationView.image = [self tint:_annotationView.image withColor:color];
}

- (void)setImage:(NSString *)image {
    _annotationView.image = [UIImage imageNamed:image];
}

- (void)setSelected:(BOOL)selected {
    _selected = selected;
    dispatch_async(dispatch_get_main_queue(), ^{
        if (selected) {
            [self.mapView selectAnnotation:self animated:YES];
        } else {
            [self.mapView deselectAnnotation:self animated:YES];
        }
    });
}

- (void)_onPress:(UITapGestureRecognizer *)recognizer {
    [self.mapView selectAnnotation:self animated:YES];
    if (self.onBaiduMapPress) {
        self.onBaiduMapPress(nil);
    }
}

- (void)_onCalloutPress:(UITapGestureRecognizer *)recognizer {
    if (self.onBaiduMapCalloutPress) {
        self.onBaiduMapCalloutPress(nil);
    }
}

- (BMKAnnotationView *)annotationView {
    self.selected = _selected;
    return _annotationView;
}

- (void)didAddSubview:(UIView *)subview {
    if ([subview isKindOfClass:[BaiduMapCallout class]]) {
        _calloutView = [[BMKActionPaopaoView alloc] initWithCustomView:subview];
        _annotationView.paopaoView = _calloutView;
    } else {
        [_annotationView addSubview:subview];
        _annotationView.image = nil;
        _annotationView.bounds = subview.bounds;
    }
}

- (UIImage *)tint:(UIImage *)image withColor:(UIColor *)color {
    CGRect rect = CGRectMake(0, 0, image.size.width, image.size.height);
    UIGraphicsBeginImageContextWithOptions(image.size, NO, image.scale);
    [color setFill];
    UIRectFill(rect);
    [image drawInRect:rect blendMode:kCGBlendModeDestinationIn alpha:1];
    UIImage *tintedImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return tintedImage;
}

+ (NSBundle *)bundle {
    static NSBundle *_bundle = nil;
    if (_bundle == nil) {
        NSURL *bundleUrl = [[NSBundle bundleForClass:[self class]] URLForResource:@"react-native-baidumap-sdk" withExtension:@"bundle"];
        _bundle = [NSBundle bundleWithURL:bundleUrl];
    }
    return _bundle;
}

@end
