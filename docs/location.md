# Location
定位模块

其中 iOS 基于 BaiduMapKit 里的定位模块，相比于完整的定位模块，只提供了少量基本的的接口。

示例：
```javascript
await Location.init()
Location.setOptions({ gps: true, auto: true })
Location.addLocationListener(location => console.log(location))
Location.start()
```

## Methods

### `init(): Promise<void>`
初始化，必须在调用其他方法前调用

### `setOptions(options: Options)`
设置参数

#### Options

##### `auto: boolean = false`
是否使用自动定位模式，定位模式中只有定位发生变化才会返回数据

##### `minDistance: number = 0`
自动定位模式时，距离变化超过最小距离才返回数据

##### `reGeocode: boolean = false`
是否返回逆地理信息

##### `coordinateType: 'gcj02' | 'bd09' | 'bd09ll' = 'gcj02'`
返回的坐标系
- `gcj02`: 国测局经纬度坐标系
- `bd09`: 百度墨卡托坐标系
- `bd09ll`: 百度经纬度坐标系

##### `scanSpan: number = 2000` (android only)
连续

##### `mode: 'Hight_Accuracy' | 'Battery_Saving' | 'Device_Sensors'` (android only)
定位模式

##### `gps: boolean = false` (android only)
是否使用 GPS

### `request`
请求单次定位，可能不会立即返回，且可能返回的不是最新定位

### `start`
开始定位，如果设置了 `auto: true` 或 `scanSpan` 则进行连续定位

### `stop`
停止定位

### `addLocationListener: (Result => void) => EventSubscription`
添加监听函数

#### Result
- `coordinateType: string` - 坐标系
- `latitude: number` - 经度
- `longitude: number` - 纬度
- `accuracy: number` - 精度
- `altitude: number` - 海拔
- `speed: number` - 速度
- `direction: number` - 方向
- `country: string` - 国家
- `countryCode: string` - 国家代码
- `province: string` - 省/直辖市
- `city: string` - 城市
- `cityCode: string` - 城市代码
- `district: string` - 城区
- `street: string` - 街道
- `streetNumber: string` - 街道编号
- `adCode: string` - 邮政编码
- `address: string` - 完整地址
- `description: string` - 语义化描述
- `locationType: number` - 定位类型