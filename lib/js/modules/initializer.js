// @flow
import { NativeModules, Platform } from 'react-native'

const { BaiduMapInitializer } = NativeModules

export default {
  init(key: string) {
    if (Platform.OS === 'android') {
      BaiduMapInitializer.init()
    } else {
      BaiduMapInitializer.init(key)
    }
  },
}
