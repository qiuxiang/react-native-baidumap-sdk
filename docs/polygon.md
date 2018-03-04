# Polygon 多边形覆盖物

```javascript
<MapView>
  <MapView.Polygon
    points={[
      { latitude: 39, longitude: 113 },
      ...
    ]}
    strokeWidth={2}
    strokeColor="rgba(0, 0, 255, 0.5)"
    fillColor="rgba(255, 0, 0, 0.5)"
  />
</MapView>
```
<img src="https://user-images.githubusercontent.com/1709072/36655489-f00b528c-1afd-11e8-9226-b59f40cc24d4.png" width=300>

## Props

### `points: LatLng[]`
坐标列表

---

### `strokeWidth?: number`
边框宽度

---

### `strokeColor?: color`
边框颜色

---

### `fillColor?: color`
填充颜色
