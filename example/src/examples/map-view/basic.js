import React, { Component } from 'react'
import { PanResponder, StyleSheet } from 'react-native'
import { MapView } from 'react-native-baidumap-sdk'

class CircularBuffer {
  length = 10
  count = 0
  buffer = []

  push(data) {
    this.buffer[this.count % this.length] = data
    this.count += 1
  }

  average() {
    const length = Math.min(this.count, this.length)
    return this.sum() / length
  }

  sum() {
    const length = Math.min(this.count, this.length)
    let sum = 0
    for (let i = 0; i < length; i += 1) {
      sum += this.buffer[i]
    }
    return sum
  }

  clear() {
    this.count = 0
    this.buffer = []
  }
}

export default class Basic extends Component {
  static navigationOptions = { title: 'Basic usage' }

  onLayout = ({ nativeEvent }) => {
    this.cx = nativeEvent.layout.width / 2
    this.cy = nativeEvent.layout.height / 2
  }

  touches = []
  v = new CircularBuffer()
  dx = new CircularBuffer()
  dy = new CircularBuffer()

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: event => {
      // console.log(event.nativeEvent)
      const touches = []
      event.nativeEvent.touches.forEach(data => {
        const touch = {
          x: data.locationX,
          y: data.locationY,
          timestamp: data.timestamp,
        }

        const prevTouch = this.touches[data.identifier]
        if (prevTouch) {
          const t = touch.timestamp - prevTouch.timestamp
          touch.dx = touch.x - prevTouch.x
          touch.dy = touch.y - prevTouch.y
          touch.vx = touch.dx / t
          touch.vy = touch.dy / t
          touch.v = Math.sqrt((touch.vx * touch.vx) + (touch.vy * touch.vy))
        }

        touches[data.identifier] = touch
      })

      touches.some(touch => {
        if (touch && touch.dx) {
          this.mapView.setStatus({
            point: {
              x: this.cx - touch.dx,
              y: this.cy - touch.dy,
            },
          })
          this.v.push(touch.v)
          this.dx.push(touch.dx)
          this.dy.push(touch.dy)
          return true
        }
        return false
      })

      this.touches = touches
    },
    onPanResponderRelease: () => {
      this.touches.some(touch => {
        if (touch && touch.dx) {
          console.log(`${touch.v}, 0`)
          // const a = 0.002
          // const v = Math.sqrt((touch.vx * touch.vx) + (touch.vy * touch.vy))
          // const vx = this.vx.sum()
          // const vy = this.vy.sum()
          // const t = Math.sqrt((vx * vx) + (vy * vy)) * 100
          // console.log(`${t}`)
          // this.mapView.setStatus({
          //   point: {
          //     x: this.cx - (touch.vx * t),
          //     y: this.cy - (touch.vy * t),
          //   },
          // }, Math.round(t))
          return true
        }
        return false
      })
      this.touches = []
      this.v.clear()
      this.dx.clear()
      this.dy.clear()
    },
  })

  render() {
    return (
      <MapView
        ref={ref => this.mapView = ref}
        style={StyleSheet.absoluteFill}
        onLayout={this.onLayout}
        zoomDisabled
        scrollDisabled
        rotateDisabled
        overlookDisabled
        {...this.panResponder.panHandlers}
      />
    )
  }
}
