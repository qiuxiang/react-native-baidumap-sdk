// @flow

// TODO: add type definition
type NavigationComponent = any

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
    /* eslint-disable no-param-reassign */
    result[`${prefix}${name}`] = { screen, title }
    return result
  }, {})
}

export default { mapComponents }
