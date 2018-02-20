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
  init: () => {
    if (BaiduMapLocation.init) {
      return BaiduMapLocation.init()
    }

    // $FlowFixMe: I don't know how to fix this
    return Promise.resolve()
  },
  start: () => BaiduMapLocation.start(),
  stop: () => BaiduMapLocation.stop(),
  setOptions: (options: Options) => BaiduMapLocation.setOptions(options),
  addLocationListener: (listener: Listener) => eventEmitter.addListener('baiduMapLocation', listener),
}
