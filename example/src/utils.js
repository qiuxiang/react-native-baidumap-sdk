// @flow
import type { NavigationComponent } from 'react-navigation/src/TypeDfinition'

export function mapComponents(
  prefix: string,
  screens: NavigationComponent[],
): {
  [key: string]: {
    title: string,
    screen: NavigationComponent,
  },
} {
  return screens.reduce((result, screen) => {
    result[`${prefix}${screen.name}`] = {
      screen,
      title: screen.navigationOptions.title,
    }
    return result
  }, {})
}

export default { mapScreens: mapComponents }
