// @flow
import { StackNavigator } from 'react-navigation'
import examples from './examples'

export default StackNavigator(examples, {
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#292c36',
    },
  },
})
