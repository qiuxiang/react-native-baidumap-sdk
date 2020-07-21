export function mapComponents(prefix, screens) {
  return Object.keys(screens).reduce((result, name) => {
    const screen = screens[name];
    const title = screen.title || screen.navigationOptions.title;
    const options = { headerTitle: title, ...screen.options };
    result[`${prefix}${name}`] = { screen, title, options };
    return result;
  }, {});
}

export default { mapComponents };
