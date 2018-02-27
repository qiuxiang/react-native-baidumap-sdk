# Polygon 线段覆盖物

```javascript
<MapView>
  <MapView.Polyline
    points={[
      { latitude: 39, longitude: 113 },
      ...
    ]}
    width={2}
    color="rgba(0, 0, 255, 0.5)"
  />
</MapView>
```
<img src="https://user-images.githubusercontent.com/1709072/36655489-f00b528c-1afd-11e8-9226-b59f40cc24d4.png" width=300>

## Props

### `points: LatLng[]`
坐标集合

### `width?: number`
线段宽度

### `color?: color`
线段颜色
