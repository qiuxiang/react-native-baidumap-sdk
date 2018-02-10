// @flow

interface Screen {
  +navigationOptions: { title: string }
}

export function mapComponents(
  prefix: string,
  screens: { [name: string]: Screen },
): {
  [key: string]: {
    title: string,
    screen: Screen,
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
