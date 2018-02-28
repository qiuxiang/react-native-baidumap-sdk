# Cricle 圆形覆盖物

```javascript
<MapView>
  <MapView.Cricle
    center={{ latitude: 39, longitude: 113 }}
    radius={10000}
    strokeWidth={2}
    strokeColor="rgba(0, 0, 255, 0.5)"
    fillColor="rgba(255, 0, 0, 0.5)"
  />
</MapView>
```
<img src="https://user-images.githubusercontent.com/1709072/36708792-bcbb596a-1baf-11e8-9d6d-fc67d917de8c.png" width=300>

## Props

### `center: LatLng`
圆点坐标

---

### `radius: number`
半径，单位（米）

---

### `strokeWidth?: number`
边框宽度

---

### `strokeColor?: color`
边框颜色

---

### `fillColor?: color`
填充颜色
