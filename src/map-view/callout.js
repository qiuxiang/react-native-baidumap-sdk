// @flow
import React from 'react'
import { requireNativeComponent, StyleSheet, ViewPropTypes } from 'react-native'
import Component from '../component'

const style = StyleSheet.create({
  callout: {
    position: 'absolute',
  },
})

type Props = {
  onPress: () => {},
} & ViewPropTypes

export default class Callout extends Component<Props> {
  static propTypes = ViewPropTypes

  nativeComponentName = 'BaiduMapCallout'

  render() {
    const props = {
      ...this.props,
      ...this.handlers(['onPress']),
      style: [style.callout, this.props.style],
    }
    return <BaiduMapCallout {...props} />
  }
}

const BaiduMapCallout = requireNativeComponent('BaiduMapCallout', Callout)
