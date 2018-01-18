import ReactNavigation from 'react-navigation'

declare module 'react-navigation' {
  declare module.exports: ReactNavigation
}

declare module 'react-navigation/src/views/TouchableItem' {
  declare module.exports: any
}
