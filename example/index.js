import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Initializer } from 'react-native-baidumap-sdk'
import examples from './examples'

StatusBar.setBarStyle('light-content')
Initializer.init('6s1BDd7jUHhzUV8S8E3kMEyAKfqkKPrw')

export default StackNavigator(examples, {
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#292c36',
    },
  },
})
