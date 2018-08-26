# 安装说明
该项目在 release 分支做了新项目的编译测试：[![build status][build-badge]][build]，可以作为参考。

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
[获取 Android 开发密钥](http://lbsyun.baidu.com/index.php?title=iossdk/guide/create-project/ak)，
在 AndroidManifest 中添加：
```xml
<application>
    <meta-data
      android:name="com.baidu.lbsapi.API_KEY"
      android:value="开发密钥" />
</application>
```

### iOS
暂时只提供 cocoapods 配置方式，手动配置请参考官方文档。

在 `ios` 目录下新建文件 `Podfile`：

```ruby
platform :ios, '8.0'

# The target name is most likely the name of your project.
target 'RNBaiduMap' do
  # Your 'node_modules' directory is probably in the root of your project,
  # but if not, adjust the `:path` accordingly
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    # Add any other subspecs you want to use in your project
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'GLog', :podspec => '../node_modules/react-native/third-party-podspecs/GLog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

  pod 'react-native-baidumap-sdk', path: '../node_modules/react-native-baidumap-sdk/lib/ios'
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```

*注意：不同的 RN 版本，`Podfile` 可能需要稍作调整，具体参考 https://facebook.github.io/react-native/docs/0.52/integration-with-existing-apps.html 。*

然后运行：
```bash
pod install
```

## 初始化（重要！！）
**在使用 react-native-baidumap-sdk 的组件、模块之前一定要初始化。未初始化可能导致应用崩溃，而初始化失败则会导致地图无法显示。**

其中 iOS 需要提供密钥作为参数（Android 密钥必须写在 Manifest），当然，你也可以用官方提供的方法进行初始化。

[获取 iOS 开发密钥](http://lbsyun.baidu.com/index.php?title=iossdk/guide/create-project/ak)。

```javascript
import { Initializer } from 'react-native-baidumap-sdk'

Initializer.init('iOS 开发密钥').catch(e => console.error(e))
```

android 下会自动忽略 init 的参数，如果应用只支持 android 则可以不带参数。

另外，android 错误码请参考[错误码对照表](http://lbsyun.baidu.com/index.php?title=androidsdk/guide/addition-func/errorcode)。

[build-badge]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk.svg?branch=release
[build]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk
