# Location 定位模块

为了让 android 与 ios 接口基本一致，只提供基础且共同的接口。

用法：
```javascript
import { Location } from 'react-native-baidumap-sdk'

await Location.init()
Location.addLocationListener(location => console.log(location))
Location.start()
```

## Methods

### `init(): Promise<void>`
初始化，必须在调用其他方法前调用

---

### `setOptions(options: Options)`
设置参数

#### `Options`
- `distanceFilter?: number = 0` 设置距离变化超过该数值才返回数据
- `gps?: boolean = false` 是否使用 GPS (android only)

---

### `start`
开始定位

---

### `stop`
停止定位

---

### `addLocationListener: (Result => void) => EventSubscription`
添加监听函数

#### `Result`
- `latitude` 经度
- `longitude` 纬度
- `accuracy` 精度
- `altitude` 海拔（米）
- `speed` 速度（m/s）
- `direction` 方向
