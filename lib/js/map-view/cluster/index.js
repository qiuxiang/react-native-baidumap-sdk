/* eslint-disable camelcase */
// @flow
import React, { PureComponent } from 'react'
import type { Element } from 'react'
import { ViewPropTypes } from 'react-native'
import SuperCluster from 'supercluster'
import type { LatLng, MapStatus } from '../../types'
import ClusterView from './cluster-view'

export type ClusterParams = {
  id: number,
  count: number,
  coordinate: LatLng,
}

type MarkerItem = {
  coordinate: LatLng,
  extra?: any,
}

type Props = {
  radius?: number,
  clusterStyle?: ViewPropTypes.style,
  clusterTextStyle?: ViewPropTypes.style,
  markers: MarkerItem[],
  renderMarker: MarkerItem => Element<*>,
  renderCluster?: ClusterParams => Element<*>,
  onPress?: ClusterParams => void,
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

export default class Cluster extends PureComponent<Props, State> {
  static defaultProps = { radius: 600 }

  state = { clusters: [] }

  componentDidMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(props: Props) {
    this.init(props)
  }

  cluster: SuperCluster

  init(props: Props) {
    const { radius } = props
    this.cluster = SuperCluster({ radius, minZoom: 3, maxZoom: 21 })
      .load(props.markers.map(marker => ({
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

  renderCluster = (cluster: ClusterParams) => (
    <ClusterView
      key={cluster.id}
      cluster={cluster}
      onPress={this.props.onPress}
      style={this.props.clusterStyle}
      textStyle={this.props.clusterTextStyle}
    />
  )

  render() {
    return this.state.clusters.map(cluster => {
      const { geometry, properties } = cluster
      const { renderCluster, renderMarker } = this.props
      const coordinate = {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }

      if (properties) {
        const { cluster_id, point_count } = cluster.properties
        const render = renderCluster || this.renderCluster
        return render({ coordinate, id: cluster_id, count: point_count })
      }

      return renderMarker({ coordinate, extra: geometry.properties })
    })
  }
}
