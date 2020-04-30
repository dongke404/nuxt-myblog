/**
 * @file Api config / ES module
 * @module api.config

 */

import { NODE_ENV } from '../environment'

const apisMap = {
  development: {
    FE: 'http://localhost:3000',
    BASE: 'http://localhost:5000',
    MUSIC:'http://www.dongkirk.xyz/playlist/detail?id=4992612670'
  },
  production: {
    FE: 'https://dongkirk.xyz',
    BASE: 'https://api.dongkirk.xyz',
    MUSIC:'http://www.dongkirk.xyz/playlist/detail?id=4992612670'
  }
}

export default apisMap[NODE_ENV]
