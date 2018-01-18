/* eslint-disable react/no-multi-comp,camelcase */
// @flow
import React, { PureComponent } from 'react'
import type { Element } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import supercluster from 'supercluster'
import type { MapStatus, LatLng } from '..'
import Marker from './marker'

const style = StyleSheet.create({
  cluster: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: 'rgba(245,83,61,0.6)',
    backgroundColor: 'rgba(245,83,61,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
})

type ClusterParams = {
  id: number,
  count: number,
  coordinate: LatLng,
}

type Props = {
  radius?: number,

  markers: {
    coordinate: LatLng,
    extra?: any,
  }[],

  renderMarker: ({
    coordinate: LatLng,
    index: number,
    extra?: any,
  }) => Element<*>,

  renderCluster?: ClusterParams => Element<*>,
}

type State = {
  clusters: {
    geometry: {
      coordinates: [number, number],
      properties: any,
    },
    properties: {
      cluster_id: number,
      point_count: number,
    },
  }[],
}

class ClusterView extends PureComponent<{ count: number, coordinate: LatLng }> {
  renderClusterView = () => (
    <View style={style.cluster}>
      <Text style={style.text}>{this.props.count}</Text>
    </View>
  )

  render() {
    return <Marker coordinate={this.props.coordinate} view={this.renderClusterView} flat />
  }
}

export default class Cluster extends PureComponent<Props, State> {
  static defaultProps = {
    radius: 500,
    renderCluster: ({ id, coordinate, count }: ClusterParams) => (
      <ClusterView key={id} coordinate={coordinate} count={count} />
    ),
  }

  state = { clusters: [] }

  componentDidMount() {
    this.cluster = supercluster({
      radius: this.props.radius,
      minZoom: 3,
      maxZoom: 21,
    })
    this.load()
  }

  cluster: supercluster

  load() {
    this.cluster.load(this.props.markers.map(marker => ({
      geometry: {
        coordinates: [marker.coordinate.longitude, marker.coordinate.latitude],
        properties: marker.extra,
      },
    })))
  }

  update({ zoomLevel, region }: MapStatus) {
    this.setState({
      clusters: this.cluster.getClusters([
        region.longitude - (region.longitudeDelta / 2),
        region.latitude - (region.latitudeDelta / 2),
        region.longitude + (region.longitudeDelta / 2),
        region.latitude + (region.latitudeDelta / 2),
      ], Math.round(zoomLevel)),
    })
  }

  render() {
    return this.state.clusters.map((cluster, index) => {
      const { geometry, properties } = cluster
      const { renderCluster, renderMarker } = this.props
      const coordinate = {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }

      if (properties) {
        const { cluster_id, point_count } = cluster.properties

        if (renderCluster) {
          return renderCluster({
            coordinate,
            id: cluster_id,
            count: point_count,
          })
        }

        return null
      }

      return renderMarker({
        index,
        coordinate,
        extra: geometry.properties,
      })
    })
  }
}
