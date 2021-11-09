import { CameraEvent } from "lib/src/map-view";
import * as React from "react";
import { Component } from "react";
import { Cluster, MapView, Marker } from "react-native-baidumap-sdk";

export default class Clustering extends Component {
  static navigationOptions = { title: "Marker clustering" };
  status?: CameraEvent;
  cluster?: Cluster | null;
  mapView?: MapView | null;
  markers = Array(1000)
    .fill(0)
    .map((_, i) => ({
      position: { latitude: 39.5 + Math.random(), longitude: 116 + Math.random() },
      properties: { key: `Marker${i}` },
    }));

  render() {
    return (
      <MapView
        ref={(ref) => (this.mapView = ref)}
        onLoad={() => this.mapView?.moveCamera({ zoom: 10 }, 100)}
        onCameraIdle={({ nativeEvent }) => {
          this.status = nativeEvent;
          this.cluster?.update(nativeEvent);
        }}
      >
        <Cluster
          onPress={({ position }) => {
            this.mapView?.moveCamera(
              {
                target: position,
                zoom: this.status!.cameraPosition.zoom! + 1,
              },
              200
            );
          }}
          ref={(ref) => (this.cluster = ref)}
          points={this.markers}
          renderMarker={(item) => (
            <Marker
              key={item.properties.key}
              icon={require("../images/flag.png")}
              position={item.position}
            />
          )}
        />
      </MapView>
    );
  }
}
