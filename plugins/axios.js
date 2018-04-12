import * as axios from 'axios'
import qs from 'qs'
import env from '~/env.config.js'

let options = {}
// The server-side needs a full url to works
// if (process.server) {
//   options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }

options.baseURL = env.baseURL;

options.transformRequest = [
  data=>qs.stringify(data)
]


export default axios.create(options)
