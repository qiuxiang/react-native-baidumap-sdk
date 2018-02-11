// @flow
import { NativeModules, NativeEventEmitter } from 'react-native'
import type { Location } from './types'

const { BaiduMapLocation } = NativeModules
const eventEmitter = new NativeEventEmitter(BaiduMapLocation)

type Options = {
  coordinateType: 'gcj02' | 'bd09' | 'bd09ll',
  mode: 'Hight_Accuracy' | 'Battery_Saving' | 'Device_Sensors',
  gps: boolean,
  scanSpan: number,
  minDistance: number,
  reGeocode: boolean,
  auto: boolean,
}

type Listener = (listener: {
  time: string,
  accuracy: number,
  coordinateType: string,
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
  address: string,
  description: string,
  locationType: number,
} & Location) => {}

export default {
  init: () => {
    if (BaiduMapLocation.init) {
      return BaiduMapLocation.init()
    }

    // $FlowFixMe: I don't know how to fix this
    return Promise.resolve()
  },
  start: () => BaiduMapLocation.start(),
  stop: () => BaiduMapLocation.stop(),
  request: () => BaiduMapLocation.request(),
  setOptions: (options: Options) => BaiduMapLocation.setOptions(options),
  addLocationListener: (listener: Listener) => eventEmitter.addListener('baiduMapLocation', listener),
}
