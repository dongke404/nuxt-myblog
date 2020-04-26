/**
 * @file Api config / ES module
 * @module api.config

 */

import { NODE_ENV } from '../environment'

const apisMap = {
  development: {
    FE: 'http://localhost:3000',
    BASE: 'http://localhost:5000',
    CDN: '',
    PROXY: '/proxy',
    SOCKET: 'http://localhost:3000',

  },
  production: {
    FE: 'https://dongkirk.xyz',
    BASE: 'https://api.dongkirk.xyz',
    PROXY: '',
    SOCKET: '',
    GRAVATAR: ''
  }
}

export default apisMap[NODE_ENV]
