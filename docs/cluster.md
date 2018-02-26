# Cluster 点聚合

```javascript
class ClusterExample extends React.Component {
  markers = [
    {
      coordinate: { latitude: 39, longitude: 113 },
      extra: { key: 'key' },
    },
    ...
  ]

  onStatusChange = status => this.cluster.update(status)

  renderMarker = item => (
    <MapView.Marker
      key={item.extra.key}
      coordinate={item.coordinate}
    />
  )
  
  render() {
    <MapView onStatusChange={this.onStatusChange}>
      <MapView.Cluster
        ref={ref => this.cluster = ref}
        markers={this.markers}
        renderMarker={this.renderMarker}
      />
    </MapView>
  }
}
```

## Props

### `markers: MarkerItem[]`
点集合

### `radius?: number`
聚合半径

#### `MarkerItem`
- `coordinate: LatLng` Marker 坐标
- `extra?: any` 附加信息，在 renderMarker 的时候会作为参数传递过去

### `renderMarker: MarkerItem => React.Element`
Marker 渲染函数

### `renderCluster?: ClusterParams => React.Element`
Cluster 渲染函数

#### `ClusterParams`
- `id: number` Cluster ID
- `count: number` CLuster 所包含点的个数
- `coordinate: LatLng` Cluster 中心坐标

### `clusterStyle?: style`
默认 Cluster 样式

### `clusterTextStyle?: style`
默认 Cluster Text 样式

### `onPress?: ClusterParams => void`
点击 Cluster 时调用