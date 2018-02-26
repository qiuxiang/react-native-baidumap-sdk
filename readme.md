# react-native-baidumap-sdk [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native BaiduMap SDK for Android + iOS.

你可以下载安装 [example.apk](https://github.com/qiuxiang/react-native-baidumap-sdk/releases/download/v0.3.0/example.apk) 看看实际中的效果。

*注意：RN v0.53 存在一些 bug（主要影响 iOS），建议使用 RN v0.52。*

## 安装

- [安装说明](docs/installation.md)
- [项目示例运行说明](docs/setup.md)

## 用法

### 基本用法
```javascript
import { MapView } from 'react-native-baidumap-sdk'

render() {
  return <MapView center={{ latitude: 39.2, longitude: 112.4 }} />
}
```

### 监听地图事件
```javascript
import { MapView } from 'react-native-baidumap-sdk'

render() {
  return (
    <MapView
      onLoad={() => console.log('onLoad')}
      onClick={point => console.log(point)}
      onStatusChange={status => console.log(status)}
    />
  )
}
```
<img src="https://user-images.githubusercontent.com/1709072/36482949-bd0b4aec-174f-11e8-8b99-1f355f5bae52.png" width=200>

### 定位并关联定位图层
```javascript
import { MapView, Location } from 'react-native-baidumap-sdk'

await Location.init()
Location.addLocationListener(location => this.setState({ location }))
Location.start()

state = { location: null }

render() {
  return <MapView location={this.state.location} locationEnabled />
}
```
<img src="https://user-images.githubusercontent.com/1709072/36482673-07a9cda4-174f-11e8-8db2-33b8f4d424bd.png" width=200>

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
<img src="https://user-images.githubusercontent.com/1709072/36481792-d5be5222-174b-11e8-98ff-bdf32860675d.png" width=200>

### 添加自定义标记
```javascript
<MapView>
  <MapView.Marker
    icon={() => (
      <View>
        <Image source={image} />
        <Text>This is a custom marker</Text>
      </View>
    )}
  />
</MapView>
```
<img src="https://user-images.githubusercontent.com/1709072/36482766-41b14fcc-174f-11e8-998a-abbf90be2db2.png" width=200>

### 地理编码/逆地理编码
```javascript
import { Geocode } from 'react-native-baidumap-sdk'

const searchResult = await Geocode.search('海龙大厦')
const reverseResult = await Geocode.reverse({ latitude: 39, longitude: 113 })
```
<img src="https://user-images.githubusercontent.com/1709072/36482622-e9122c9c-174e-11e8-82c7-f28628128729.png" width=200>

需要注意，以上例子简写了一些属性，并不能直接使用，更多实际的例子请参考：[example](https://github.com/qiuxiang/react-native-baidumap-sdk/tree/master/example)。

## 接口文档
[JS 代码](lib/js)有完善的类型标注，建议结合源代码一起阅读，特别是需要知道具体参数、返回值类型的时候。

- [MapView](docs/map-view.md)
  - [Marker](docs/marker.md)
  - [Polygon](docs/polygon.md)
  - [Cluster](docs/cluster.md)
- [Location](docs/location.md)
- [Geocode](docs/geocode.md)

[npm]: https://www.npmjs.com/package/react-native-baidumap-sdk
[version-badge]: https://badge.fury.io/js/react-native-baidumap-sdk.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk
