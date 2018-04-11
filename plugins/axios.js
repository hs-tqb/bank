import * as axios from 'axios'
import qs from 'qs'


let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

options.transformRequest = [
  data=>qs.stringify(data)
]


export default axios.create(options)
