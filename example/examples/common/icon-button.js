// @flow
import React from 'react'
import { ColorPropType, Image, StyleSheet, View } from 'react-native'
import Touchable from 'react-navigation/src/views/TouchableItem'

const style = StyleSheet.create({
  container: {
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
})

type Props = {
  onPress: () => {},
  source: Image.propTypes.source,
  color: ColorPropType,
}

export default ({ onPress, source, color }: Props) => {
  const tintColor = color || '#fff'
  return (
    <Touchable onPress={onPress} borderless>
      <View style={style.container}>
        <Image style={[style.icon, { tintColor }]} source={source} />
      </View>
    </Touchable>
  )
}
