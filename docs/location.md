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
##### 通用
- `distanceFilter?: number = 0` 在自动回调位置模式下，设置距离变化超过该数值才返回数据

##### (android only)
- `gps?: boolean = false` 是否使用 GPS (android only)
- `scanSpan?: int` 设置扫描间隔，单位是毫秒 当<1000(1s)时，定时定位无效
- `direction?: boolean = false` 在网络定位时，是否需要设备方向 true:需要 ; false:不需要
- `notify?: boolean = false` 设置是否进行位置提醒，true的情况下收到gps会一秒回调一次，无论配置的scanspan是多少
- `locationMode?: int`
    * 1 - Battery_Saving 低功耗模式
    * 2 - Device_Sensors 仅设备(Gps)模式
    * 3 - Hight_Accuracy 高精度模式
- `autoNotifyMode?: boolean = false` 设置打开自动回调位置模式，该开关打开后，期间只要定位SDK检测到位置变化就会主动回调给开发者，该模式下开发者无需再关心定位间隔是多少，定位SDK本身发现位置变化就会及时回调给开发者
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
