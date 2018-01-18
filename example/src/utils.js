// @flow
import type { NavigationComponent } from 'react-navigation/src/TypeDefinition'

export function mapComponents(
  prefix: string,
  screens: { [name: string]: NavigationComponent },
): {
  [key: string]: {
    title: string,
    screen: NavigationComponent,
  },
} {
  return Object.keys(screens).reduce((result, name) => {
    const screen = screens[name]
    const { title } = screen.navigationOptions
    result[`${prefix}${name}`] = { screen, title }
    return result
  }, {})
}

export default { mapComponents }
