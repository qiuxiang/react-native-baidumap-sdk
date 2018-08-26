/**
 * Base component, contains some utils
 *
 * @flow
 */
import { PureComponent } from 'react'
import { findNodeHandle, UIManager } from 'react-native'

export default class Component<T> extends PureComponent<T> {
  /**
   * Must be defined in subclass if need to call native component method
   */
  nativeComponentName: string

  /**
   * Call native method
   */
  call(command: string, params?: any[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.nativeComponentName].Commands[command],
      params,
    )
  }

  /**
   * Generate event handlers
   */
  handlers(events: string[]) {
    return events.reduce((handlers, name) => {
      // $FlowFixMe: I want to keep this simple
      const handler = this.props[name]
      if (handler) {
        /* eslint-disable no-param-reassign */
        handlers[name.replace(/^on/, 'onBaiduMap')] = event => handler(event.nativeEvent)
      }
      return handlers
    }, {})
  }
}
