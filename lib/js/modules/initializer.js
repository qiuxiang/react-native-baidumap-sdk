// @flow
import { NativeModules, Platform } from 'react-native'

const { BaiduMapInitializer } = NativeModules

export default {
  init(key: string) {
    if (Platform.OS === 'android') {
      return BaiduMapInitializer.init()
    }
    return BaiduMapInitializer.init(key)
  },
}
