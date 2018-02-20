import ReactNative from 'react-native'
import EventEmitter from 'EventEmitter'
import EventSubscription from 'EventSubscription'

declare module 'react-native' {
  declare module.exports: ReactNative
}

declare module EventEmitter {
  declare module.exports: EventEmitter
}

declare module EventSubscription {
  declare module.exports: EventSubscription
}
