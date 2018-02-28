# MapView 地图组件

```javascript
import { MapView } from 'react-native-baidumap-sdk'

render() {
  return (
    <MapView
      style={{ flex: 1 }}
      center={{ latitude: 39, longitude: 113 }}
      zoomLevel={16}
    />
  )
}
```

## Props

### `center?: LatLng`
地图中心

---

### `zoomLevel?: number`
缩放级别，取值范围 [3, 21]

---

### `rotation?: number`
选择角度，取值范围 [0, 360]

---

### `overlook?: number`
倾斜角度，取值范围 [-45, 0]

---

### `minZoomLevel?: number`
最小缩放级别

---

### `maxZoomLevel?: number`
最大缩放级别

---

### `satellite?: boolean`
是否显示卫星图

---

### `trafficEnabled?: boolean`
是否显示路况

---

### `baiduHeatMapEnabled?: boolean`
是否显示百度城市热力图

---

### `indoorEnabled?: boolean`
是否显示室内地图

---

### `buildingsDisabled?: boolean`
是否禁用3D建筑

---

### `compassDisabled?: boolean`
是否禁用指南针

---

### `zoomControlsDisabled?: boolean` (android only)
是否禁用缩放按钮

---

### `scaleBarDisabled?: boolean`
是否禁用比例尺

---

### `scrollDisabled?: boolean`
是否禁用滑动手势

---

### `zoomDisabled?: boolean`
是否禁用缩放手势

---

### `rotateDisabled?: boolean`
是否禁用选择手势

---

### `overlookDisabled?: boolean`
是否禁用倾斜手势

---

### `locationEnabled?: boolean`
是否显示定位图层

---

### `location?: Location`
设置定位数据

---

### `locationMode?: 'normal' | 'follow' | 'compass'`
设置定位模式

- `normal` 普通模式，地图不会自动移动到定位点
- `follow` 跟随模式，地图会自动移动到定位点
- `compass` 罗盘模式，显示罗盘且地图会自动移动到定位点

### `onLoad?: () => void`
地图加载完毕后调用

---

### `onClick?: LatLng => void`
点击地图时调用

---

### `onLongClick?: LatLng => void`
长按地图时调用

---

### `onDoubleClick?: LatLng => void`
双击地图时调用

---

### `onStatusChange?: MapStatus => void`
地图状态更新时调用，比如地图滑动、缩放完成后

## Methods

### `setStatus(status: Status, duration?: number = 0)`
- `status` 地图状态，包括中心坐标、缩放级别等
- `duration` 过渡时间，以毫秒（ms）为单位
