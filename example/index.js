import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { SDK } from 'react-native-baidumap-sdk'
import examples from './examples'

StatusBar.setBarStyle('light-content')
SDK.init()

export default StackNavigator(examples, {
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#292c36',
    },
  },
})
