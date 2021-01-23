/**
 * @file Api config / ES module
 * @module api.config
 */

const NODE_ENV = process.env.NODE_ENV
const apisMap = {
  development: {
    FE: 'http://localhost:3000',
    BASE: 'http://localhost:5000',
    MUSIC: 'http://www.dongkirk.xyz/playlist/detail?id=4992612670'
  },
  production: {
    FE: 'https://kedong.me',
    BASE: 'https://kedong.me/api',
    MUSIC: 'http://www.dongkirk.xyz/playlist/detail?id=4992612670'
  }
}

export default apisMap[NODE_ENV]
