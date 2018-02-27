import React, { Component } from 'react';
import { View, Text, ViewPropTypes, ColorPropType } from 'react-native';
import PropTypes from 'prop-types'
import { LatLngPropType, mapEventsPropType } from '../prop-types'
import Marker from './marker'

const events = ['onPress']

type Props = {
  content?: string,
  coordinate: LatLng,
  fontSize?: number,
  color?: ColorPropType,
  backgroundColor?: ColorPropType,
  wrapperStyle?: ?ViewPropTypes.style,
  textStyle?: ?ViewPropTypes.style,
  onPress?: Function,
} & ViewPropTypes

export default class TextView extends Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    content: PropTypes.string,
    coordinate: LatLngPropType.isRequired,
    fontSize: PropTypes.number,
    color: ColorPropType,
    backgroundColor: ColorPropType,
    wrapperStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  }

  renderMarker = () => {
    const { backgroundColor, color, fontSize, content, wrapperStyle, textStyle } = this.props
    return (
      <View style={[wrapperStyle, { backgroundColor: backgroundColor }]}>
        <Text style={[textStyle, { color: color, fontSize: fontSize }]}>{content}</Text>
      </View>
    )
  }

  render() {
    return (
      <Marker
        flat
        view={this.renderMarker}
        coordinate={this.props.coordinate} />
    )
  }
}
