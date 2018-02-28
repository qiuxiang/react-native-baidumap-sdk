# Geocode 地理编码/逆编码模块

```javascript
import { Geocode } from 'react-native-baidumap-sdk'

// 地理编码，也就是地址 -> 坐标
const searchResult = await Geocode.search('海龙大厦', '北京市')

// 逆地理编码，也就是坐标 -> 地址
const reverseResult = await Geocode.reverse({ latitude: 39, longitude: 113 })
```

## Methods

### `search(address: string, city: string = ''): Promise<SearchResult>`
地理编码，地址 -> 坐标

#### `SearchResult`
- `address` 应该是与传进来的地址是一样的
- `latitude` 转换之后的经度
- `longitude` 转换之后的经度

---

### `reverse(coordinate: LatLng): Promise<ReverseResult>`
逆地理编码，坐标 -> 地址

#### `ReverseResult`
- `latitude` 应该与传进来的经度是一样的
- `longitude` 应该与传进来的纬度是一样的
- `country` 国家
- `countryCode` 国家代码
- `province` 省/直辖市
- `city` 城市
- `cityCode` 城市代码
- `district` 城区
- `street` 街道
- `streetNumber` 街道编号
- `businessCircle` 商圈
- `adCode` 邮政编码
- `address` 完整地址
- `description` 语义化描述
