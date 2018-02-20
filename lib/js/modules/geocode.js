// @flow
import { NativeModules } from 'react-native'
import type { LatLng } from '../types'

const { BaiduMapGeocode } = NativeModules

type SearchResult = { address: string } & LatLng

type ReverseResult = {
  country: string,
  countryCode: string,
  province: string,
  city: string,
  cityCode: string,
  district: string,
  street: string,
  streetNumber: string,
  businessCircle: string,
  adCode: string,
  address: string,
  description: string,
} & LatLng

export default {
  search(address: string, city: string = '') : Promise<SearchResult> {
    return BaiduMapGeocode.search(address, city)
  },
  reverse(coordinate: LatLng) : Promise<ReverseResult> {
    return BaiduMapGeocode.reverse(coordinate)
  },
}
