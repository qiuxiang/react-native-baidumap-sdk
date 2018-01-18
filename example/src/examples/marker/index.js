// @flow
import { mapComponents } from '../../utils'
import Basic from './basic'
import Callout from './callout'
import CustomView from './custom-view'
import Clustering from './clustering'

export default mapComponents('marker', [Basic, Callout, CustomView, Clustering])
