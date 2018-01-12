// @flow
import { NativeModules, NativeEventEmitter } from 'react-native'

const { BaiduMapLocation } = NativeModules
const eventEmitter = new NativeEventEmitter(BaiduMapLocation)

type Options = {
  coordinateType: 'gcj02' | 'bd09' | 'bd09ll',
  locationMode: 'Hight_Accuracy' | 'Battery_Saving' | 'Device_Sensors',
  scanSpan: number,
  minDistance: number,
  detailed: boolean,
  autoMode: boolean,
}

type Listener = (listener: {
  time: string,
  coordinateType: string,
  accuracy: number,
  latitude: number,
  longitude: number,
  altitude: number,
  speed: number,
  direction: number,
  country: string,
  countryCode: string,
  province: string,
  city: string,
  cityCode: string,
  district: string,
  street: string,
  streetNumber: string,
  adCode: string,
  description: string,
  locationType: number,
}) => {}

export default {
  start: () => BaiduMapLocation.start(),
  stop: () => BaiduMapLocation.stop(),
  request: () => BaiduMapLocation.request(),
  setOptions: (options: Options) => BaiduMapLocation.setOptions(options),
  addLocationListener: (listener: Listener) => eventEmitter.addListener('baiduMapLocation', listener),
}
