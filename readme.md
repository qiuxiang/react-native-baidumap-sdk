# react-native-baidumap-sdk [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native BaiduMap SDK.

## 安装

### 引入项目
```bash
npm i react-native-baidumap-sdk
```
或
```bash
$ yarn add react-native-baidumap-sdk
```

### 配置

#### Android
```bash
$ react-native link react-native-baidumap-sdk
```

#### iOS
暂时只提供 cocoapods 配置方式。

在 `ios` 目录下新建文件 `Podfile`：

```ruby
platform :ios, '8.0'

target '...' do
  pod 'yoga', path: '../node_modules/react-native/ReactCommon/yoga'
  pod 'React', path: '../node_modules/react-native', :subspecs => [
    'DevSupport',
  ]
  pod 'react-native-baidumap-sdk', path: '../node_modules/react-native-baidumap-sdk/lib/ios'
end
```

然后运行：
```bash
$ pod install
```

### 添加密钥

#### Android
1. [获取密钥](http://lbsyun.baidu.com/index.php?title=androidsdk/guide/create-project/ak)
2. 在 AndroidManifest 中添加：
   ```xml
   <application>  
       <meta-data  
          android:name="com.baidu.lbsapi.API_KEY"  
          android:value="开发密钥" />  
   </application>
   ```

#### iOS
1. [获取密钥](http://lbsyun.baidu.com/index.php?title=iossdk/guide/create-project/ak)
2. 在 `AppDelegate.m` 中添加密钥信息：
   ```objective-c
   #import <BaiduMapAPI_Base/BMKMapManager.h>

   - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
       BMKMapManager *mapManager = [BMKMapManager new];
       [mapManager start:@"开发密钥" generalDelegate:nil];

       ...
   }
   ```

## 用法

### 基本用法
```javascript
import { MapView } from 'react-native-baidumap-sdk'

render() {
  return <MapView center={{ latitude: 39.2, longitude: 112.4 }}>
}
```

### 定位并关联定位图层
```javascript
import { MapView, Location } from 'react-native-baidumap-sdk'

await Location.init()
Location.addLocationListener(location => this.setState({ location }))
Location.request()

state = { location: null }

render() {
  return <MapView location={this.state.location} locationEnabled />
}
```

### 添加标记
```javascript
<MapView>
  <MapView.Marker
    color="#2ecc71"
    title="This is a marker"
    onPress={this.onPress}
  />
</MapView>
```

### 添加自定义标记
```javascript
<MapView>
  <MapView.Marker
    icon={() => (
      <View>
        <Image sourcr={image} />
        <Text>This is a custom marker</Text>
      </View>
    )}
  />
</MapView>
```

## 示例
你可以在 [example](https://github.com/qiuxiang/react-native-baidumap-sdk/tree/master/example) 找到一些实际的例子，当然，你可以将项目 clone 下来运行，或者直接安装 [example.apk](https://github.com/qiuxiang/react-native-baidumap-sdk/releases/download/v0.2.0/example.apk)。

### 初始化
```bash
$ yarn
$ yarn start # 这会占用一个终端窗口
```

### Android
```bash
$ yarn run-android
```

### iOS
```bash
$ cd ios && pod install && cd ..
$ yarn run-ios
```

[npm]: https://www.npmjs.com/package/react-native-baidumap-sdk
[version-badge]: https://badge.fury.io/js/react-native-baidumap-sdk.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk
