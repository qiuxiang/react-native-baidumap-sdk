// @flow
import React, { PureComponent } from 'react'
import { ColorPropType, requireNativeComponent, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { LatLng } from '../prop-types'

type Props = {
  coordinate: LatLng,
  children: string,
  fontSize?: number,
  rotation?: number,
  color?: ColorPropType,
  backgroundColor?: ColorPropType,
}

export default class Text extends PureComponent<Props> {
  static propTypes = {
    ...ViewPropTypes,
    coordinate: LatLng.isRequired,
    content: PropTypes.string,
    fontSize: PropTypes.number,
    rotation: PropTypes.number,
    color: ColorPropType,
    backgroundColor: ColorPropType,
  }

  render() {
    const props = {
      ...this.props,
      content: this.props.children,
    }
    delete props.children
    return <BaiduMapText {...props} />
  }
}

const BaiduMapText = requireNativeComponent('BaiduMapText', Text)
