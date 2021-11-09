# react-native-baidumap-sdk [![npm version][version-badge]][npm] [![build status][build-badge]][build]

**注意：该项目现在正在进行重构，接口重新设计且部分重新实现。**

react-native 百度地图组件，支持 Android + iOS。

## 安装

```bash
npm i react-native-baidumap-sdk
```

### 添加 API Key

首先你需要获取百度地图 API Key：

- [Android](http://lbs.amap.com/api/android-sdk/guide/create-project/get-key)
- [iOS](https://lbs.amap.com/api/ios-sdk/guide/create-project/get-key)

然后你需要在显示地图前调用接口设置 API key：

```js
import { BaiduMapSdk } from "react-native-baidumap-sdk";

BaiduMapSdk.init(
  Platform.select({
    android: "c52c7169e6df23490e3114330098aaac",
    ios: "186d3464209b74effa4d8391f441f14d",
  })
);
```

## 用法

### 显示地图

```jsx
import { MapView, MapType } from "react-native-baidumap-sdk";

<MapView
  mapType={MapType.Satellite}
  initialCameraPosition={{
    target: {
      latitude: 39.91095,
      longitude: 116.37296,
    },
    zoom: 8,
  }}
/>;
```

<img src=https://user-images.githubusercontent.com/1709072/140698774-bdbfee64-d403-4e49-9a85-716d44783cfd.png height=500> <img src=https://user-images.githubusercontent.com/1709072/140849895-dada3f51-74c0-4685-b5d6-c1b69a4d06bb.PNG height=500>

### 监听地图事件

```jsx
import { MapView } from 'react-native-baidumap-sdk'

render() {
  return (
    <MapView
      onLoad={() => console.log('onLoad')}
      onPress={({ nativeEvent }) => console.log(nativeEvent)}
      onCameraIdle={({ nativeEvent }) => console.log(nativeEvent)}
    />
  )
}
```

<img src=https://user-images.githubusercontent.com/1709072/140705501-9ed3e038-e52a-48c2-a98a-235c5c890549.png height=500> <img src=https://user-images.githubusercontent.com/1709072/140849894-3add3858-fc7f-47cd-9786-94aeef399ebc.PNG height=500>

### 添加标记

其中 `icon` 支持 [ImageSource](https://reactnative.dev/docs/image#imagesource)。

同时支持 `children` 作为标记图标。

```jsx
import { MapView, Marker } from "react-native-baidumap-sdk";

<MapView>
  <Marker
    position={{ latitude: 39.806901, longitude: 116.397972 }}
    icon={require("../images/flag.png")}
    onPress={() => alert("onPress")}
  />
  <Marker
    position={{ latitude: 39.806901, longitude: 116.297972 }}
    icon={{
      uri: "https://reactnative.dev/img/pwa/manifest-icon-512.png",
      width: 64,
      height: 64,
    }}
  />
  <Marker position={{ latitude: 39.906901, longitude: 116.397972 }}>
    <Text
      style={{
        color: "#fff",
        backgroundColor: "#009688",
        alignItems: "center",
        borderRadius: 5,
        padding: 5,
      }}
    >
      {new Date().toLocaleString()}
    </Text>
  </Marker>
</MapView>;
```

<img src=https://user-images.githubusercontent.com/1709072/140707579-4abe070a-3fc1-481d-8a2e-91ac2ad8bdc7.png height=500> <img src=https://user-images.githubusercontent.com/1709072/140849886-7eb9322b-8fa8-4049-a7b0-3eb36d006992.PNG height=500>

### 点聚合

Marker 数量过多（尤其是使用自定义 View 的情况下）会导致性能问题，而且显示过于密集，这时候可以用点聚合改善。

```jsx
import { Cluster, MapView, Marker } from "react-native-baidumap-sdk";

const markers = Array(1000)
  .fill(0)
  .map((_, i) => ({
    position: { latitude: 39.5 + Math.random(), longitude: 116 + Math.random() },
    properties: { key: `Marker${i}` },
  }));

<MapView
  ref={(ref) => (this.mapView = ref)}
  onLoad={() => this.mapView?.moveCamera({ zoom: 8 }, 100)}
  onCameraIdle={({ nativeEvent }) => {
    this.status = nativeEvent;
    this.cluster?.update(nativeEvent);
  }}
>
  <Cluster
    onPress={({ position }) => {
      this.mapView?.moveCamera(
        {
          target: position,
          zoom: this.status!.cameraPosition.zoom! + 1,
        },
        200
      );
    }}
    ref={(ref) => (this.cluster = ref)}
    points={markers}
    renderMarker={(item) => (
      <Marker
        key={item.properties.key}
        icon={require("../images/flag.png")}
        position={item.position}
      />
    )}
  />
</MapView>
```

<img src=https://user-images.githubusercontent.com/1709072/140710764-40f767cd-74fd-47ca-8310-897bbf58fbbd.png height=500> <img src=https://user-images.githubusercontent.com/1709072/140849888-6b6609c1-2e55-41c2-bdc3-f9d3fcc7a112.PNG height=500>

<img src=https://user-images.githubusercontent.com/1709072/140710758-63e81ade-2635-4412-a5fa-b6948605fe75.png height=500> <img src=https://user-images.githubusercontent.com/1709072/140849880-9eb7609d-55a7-43be-8b6a-bac725fb0a82.PNG height=500>

### 更多示例

参考 [examples](https://github.com/qiuxiang/react-native-baidumap-sdk/tree/master/example/examples)。

#### Android

```bash
npm run android
```

#### iOS

```bash
cd ios && pod install && cd ..
npm run ios
```

## 常见问题

- 尽量使用真实设备进行测试，在模拟器可能存在一些问题（常见的是 Android 模拟器因为缺少 GPU 加速而导致闪退）。
- onLocation 没有返回定位数据通常是因为 key 不正确，或没有申请 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION 权限

[npm]: https://www.npmjs.com/package/react-native-baidumap-sdk
[version-badge]: https://badge.fury.io/js/react-native-baidumap-sdk.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-baidumap-sdk
