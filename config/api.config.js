/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { NODE_ENV } from '../environment'

const apisMap = {
  development: {
    FE: 'http://localhost:3000',
    BASE: 'http://localhost:5000',
    CDN: '',
    PROXY: '/proxy',
    SOCKET: 'http://localhost:3000',
    GRAVATAR: '/proxy/static.surmon.me/avatar'
  },
  production: {
    FE: 'https://dongkirk.xyz',
    BASE: 'https://api.dongkirk.xyz',
    PROXY: 'https://cdn.surmon.me/proxy',
    SOCKET: 'https://surmon.me',
    GRAVATAR: 'https://static.surmon.me/avatar'
  }
}

export default apisMap[NODE_ENV]
