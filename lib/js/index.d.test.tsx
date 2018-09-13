import React from "react";
import { View } from "react-native";
import { MapView } from ".";

const latlng = { latitude: 0, longitude: 0 };

export default () => (
  <View>
    <MapView center={latlng}>
      <MapView.Marker coordinate={latlng} view={() => <View />} />
      <MapView.Polygon points={[latlng]} strokeColor="red" strokeWidth={2} />
      <MapView.Polyline points={[latlng]} />
      <MapView.HeatMap points={[{ ...latlng, intensity: 1 }]} />
      <MapView.Cluster
        markers={[{ coordinate: latlng }]}
        renderMarker={({ coordinate }) => (
          <MapView.Marker coordinate={coordinate} />
        )}
      />
    </MapView>
  </View>
);
