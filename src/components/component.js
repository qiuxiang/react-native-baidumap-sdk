/**
 * Base component, contains some utils
 *
 * @flow
 */
import { PureComponent } from 'react'
import { findNodeHandle, UIManager } from 'react-native'

export default class Component<T> extends PureComponent<T> {
  /**
   * Must defined in subclass if want to call native component method
   */
  nativeComponentName: string

  call(command: string, params?: any[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.nativeComponentName].Commands[command],
      params,
    )
  }

  handlers(events: string[]) {
    return events.reduce((handlers, name) => {
      handlers[name.replace(/^on/, 'onBaiduMap')] = event => {
        // $FlowFixMe: I hope to keep it simple
        const handler = this.props[name]
        if (handler) {
          handler(event.nativeEvent)
        }
      }
      return handlers
    }, {})
  }
}
