import ReactNavigation from 'react-navigation'
import TouchableItem from 'react-navigation/src/views/TouchableItem'

declare module 'react-navigation' {
  declare module.exports: ReactNavigation
}

declare module 'react-navigation/src/views/TouchableItem' {
  declare module.exports: TouchableItem
}
