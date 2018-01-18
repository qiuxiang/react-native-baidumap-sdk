import ReactNative from 'react-native'

declare module 'react-native' {
  declare module.exports: ReactNative
}

declare module EventEmitter {
  declare module.exports: any
}

declare module EventSubscription {
  declare module.exports: any
}
