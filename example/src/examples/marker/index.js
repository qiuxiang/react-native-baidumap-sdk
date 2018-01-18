// @flow
import Basic from './basic'
import Callout from './callout'
import CustomView from './custom-view'
import Clustering from './clustering'

const route = screen => ({ screen, title: screen.navigationOptions.title })

export default {
  markerBasic: route(Basic),
  markerCallout: route(Callout),
  markerCustomView: route(CustomView),
  markerClustering: route(Clustering),
}
