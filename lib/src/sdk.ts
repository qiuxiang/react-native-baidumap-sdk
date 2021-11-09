import { NativeModules } from "react-native";

const { BaiduMapSdk } = NativeModules;

export function init(apiKey?: string) {
  BaiduMapSdk.init(apiKey);
}

export function getVersion(): Promise<string> {
  return BaiduMapSdk.getVersion();
}
