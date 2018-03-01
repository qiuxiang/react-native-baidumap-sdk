# HeatMap 热力图

```javascript
points = [
  {
    latitude: 39,
    longitude: 113,
    intensity: 16,
  },
  ...
]

<MapView>
  <MapView.HeatMap
    points={this.points}
    radius={20}
    opacity={0.5}
  />
</MapView>
```
<img src="https://user-images.githubusercontent.com/1709072/36829390-f57f7e7e-1d59-11e8-8654-2f264e61d32b.png" width=300>

## Props

### `points: HeatMapNode[]`
点数组

### `HeatMapNode`
- `latitude` 经度
- `longitude` 纬度
- `instensity` 强度

---

### `radius: number`
半径

---

### `opacity: number`
透明度
