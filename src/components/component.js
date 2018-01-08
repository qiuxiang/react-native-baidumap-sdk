/**
 * Base component
 *
 * @flow
 */
import { PureComponent } from 'react'
import { findNodeHandle, UIManager } from 'react-native'

export default class Component<T> extends PureComponent<T> {
  /**
   * Native component name
   */
  name: string

  run(command: string, params?: any[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager[this.name].Commands[command],
      params,
    )
  }
}
