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
<img src="https://user-images.githubusercontent.com/1709072/36482316-d9d645e8-174d-11e8-8268-b3c4271e886c.png" width=200>

## Props

### `points: LatLng[]`
标记点坐标

### `strokeWidth?: number`
边框宽度

### `strokeColor?: color`
边框颜色

### `fillColor?: color`
填充颜色