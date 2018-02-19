# 安装说明

## 引入项目
```bash
npm i react-native-baidumap-sdk
```
或
```bash
yarn add react-native-baidumap-sdk
```

## 配置

### Android
```bash
react-native link react-native-baidumap-sdk
```

### iOS
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
pod install
```

## 添加密钥

### Android
1. [获取密钥](http://lbsyun.baidu.com/index.php?title=androidsdk/guide/create-project/ak)
2. 在 AndroidManifest 中添加：

   ```xml
   <application>  
       <meta-data  
          android:name="com.baidu.lbsapi.API_KEY"  
          android:value="开发密钥" />  
   </application>
   ```

### iOS
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
