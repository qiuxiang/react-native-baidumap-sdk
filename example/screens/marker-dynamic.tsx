import * as React from "react";
import { LatLng, MapView, Marker } from "react-native-baidumap-sdk";

export default () => {
  const [markers, setMarkers] = React.useState(Array<LatLng>());
  React.useEffect(() => alert("点击地图添加 Marker，点击 Marker 移除"), []);
  console.log(markers);
  return (
    <MapView
      onPress={({ nativeEvent }) => {
        console.log(nativeEvent);
        setMarkers([...markers, nativeEvent]);
      }}
    >
      {markers.map((position) => (
        <Marker
          key={`${position.latitude},${position.longitude}`}
          position={position}
          icon={require("../images/flag.png")}
          onPress={() => {
            markers.splice(markers.indexOf(position), 1);
            console.log(markers);
            setMarkers([...markers]);
          }}
        />
      ))}
    </MapView>
  );
};
