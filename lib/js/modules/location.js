// @flow
import { NativeModules, NativeEventEmitter } from 'react-native'
import type { Location } from '../types'

const { BaiduMapLocation } = NativeModules
const eventEmitter = new NativeEventEmitter(BaiduMapLocation)

type Options = {
  gps: boolean,
  distanceFilter: number,
}

type Listener = (listener: {
  timestamp: number,
  altitude: number,
  speed: number,
} & Location) => {}

export default {
  init() : Promise<void> {
    if (BaiduMapLocation.init) {
      return BaiduMapLocation.init()
    }

    return Promise.resolve()
  },
  start: () => BaiduMapLocation.start(),
  stop: () => BaiduMapLocation.stop(),
  setOptions: (options: Options) => BaiduMapLocation.setOptions(options),
  addLocationListener: (listener: Listener) => eventEmitter.addListener('baiduMapLocation', listener),
}
