# react-native-baidumap-sdk [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native BaiduMap SDK for Android + iOS.

*注意：RN v0.53 存在一些 bug（主要影响 iOS），建议使用 RN v0.52.2。*

## 安装

- [安装说明](docs/installation.md)
- [项目示例运行说明](docs/setup.md)

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

需要注意，以上例子简写了一些属性，并不能直接使用，更多实际的例子请参考：[example](https://github.com/qiuxiang/react-native-baidumap-sdk/tree/master/example)。

## 接口文档
建议结合源代码一起阅读，[JS 代码](lib/js)有完善的 flow 类型标注，特别是需要知道具体参数类型的时候。

- [MapView](docs/map-view.md)
  - [Marker](docs/marker.md)
  - [Polygon](docs/polygon.md)
- [Location](docs/location.md)

[npm]: https://www.npmjs.com/package/react-native-baidumap-sdk
[version-badge]: https://badge.fury.io/js/react-native-baidumap-sdk.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk
