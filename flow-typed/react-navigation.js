import ReactNavigation from 'react-navigation'
import TouchableItem from 'react-navigation/src/views/TouchableItem'
import TypeDfinition from 'react-navigation/src/TypeDfinition'

declare module 'react-navigation' {
  declare module.exports: ReactNavigation
}

declare module 'react-navigation/src/views/TouchableItem' {
  declare module.exports: TouchableItem
}

declare module 'react-navigation/src/TypeDfinition' {
  declare module.exports: TypeDfinition
}
