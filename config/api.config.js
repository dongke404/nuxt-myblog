/**
 * @file Api config / ES module
 * @module api.config
 */

const NODE_ENV = process.env.NODE_ENV
const apisMap = {
  development: {
    WEBSITE: 'http://127.0.0.1',//博客地址
    BASE: 'http://127.0.0.1:5000/api', //接口地址
    MUSIC: 'http://kedong.me:9999/playlist/detail?id=4992612670',//歌单地址 改自己id
    MUSIC_BASEURL:'http://kedong.me:9999',
  },
  production: {
    WEBSITE: 'https://kedong.me',
    BASE: 'https://kedong.me/api',
    MUSIC: 'http://kedong.me:9999/playlist/detail?id=4992612670',
    MUSIC_BASEURL:'http://kedong.me:9999',
  }
}

export default apisMap[NODE_ENV]
