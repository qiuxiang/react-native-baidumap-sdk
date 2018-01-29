// @flow
import React from 'react'
import { Switch } from 'react-native'

export default (props: { value: boolean }) => (
  <Switch
    onTintColor="rgba(245,83,61,0.5)"
    thumbTintColor={props.value ? '#f5533d' : '#f5f5f5'}
    {...props}
  />
)
