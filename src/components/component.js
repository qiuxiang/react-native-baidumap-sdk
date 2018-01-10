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
}
