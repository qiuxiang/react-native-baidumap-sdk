// @flow
import { mapComponents } from '../../utils'
import Basic from './basic'
import Image from './image'
import Draggable from './draggable'
import Callout from './callout'
import CustomView from './custom-view'
import Clustering from './clustering'

export default mapComponents('marker', {
  Basic,
  Image,
  Draggable,
  Callout,
  CustomView,
  Clustering,
})
