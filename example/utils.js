export function mapComponents(prefix, screens) {
  return Object.keys(screens).reduce((result, name) => {
    const screen = screens[name];
    const { title } = screen.navigationOptions;
    result[`${prefix}${name}`] = { screen, title };
    return result;
  }, {});
}

export default { mapComponents };
