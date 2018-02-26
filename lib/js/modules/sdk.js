// @flow
import { NativeModules, Platform } from 'react-native'

const { BaiduMapSDK } = NativeModules

export default {
  init(key: string) {
    if (Platform.OS === 'android') {
      BaiduMapSDK.init()
    } else {
      BaiduMapSDK.init(key)
    }
  },
}
