// @flow
import { NativeModules } from 'react-native'
import type { LatLng } from '../types'

const { BaiduMapGeocode } = NativeModules

export default {
  search: (address: string, city: string) => BaiduMapGeocode.search(address, city),
  reverse: (coordinate: LatLng) => BaiduMapGeocode.reverse(coordinate),
}
