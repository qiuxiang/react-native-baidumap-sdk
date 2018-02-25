// @flow
import { NativeModules } from 'react-native'

const { BaiduMapSDK } = NativeModules

export default {
  init: () => BaiduMapSDK.init && BaiduMapSDK.init(),
}
