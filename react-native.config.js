module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios/react-native-baidumap-sdk.podspec" },
      android: { sourceDir: "lib/android" }
    }
  },
  dependencies: {
    "react-native-baidumap-sdk": {
      root: __dirname,
      platforms: {
        ios: { podspecPath: __dirname + "/lib/ios/react-native-baidumap-sdk.podspec" },
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import cn.qiuxiang.react.baidumap.BaiduMapPackage;",
          packageInstance: "new BaiduMapPackage()"
        }
      }
    }
  }
};
