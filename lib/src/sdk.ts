import { NativeModules } from "react-native";

const { BaiduMapSdk } = NativeModules;

export function init(apiKey?: string) {
  BaiduMapSdk.initSdk(apiKey);
}
