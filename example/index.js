// @flow
import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import examples from './examples'

StatusBar.setBarStyle('light-content')

export default StackNavigator(examples, {
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#292c36',
    },
  },
})
