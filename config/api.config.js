/**
 * @file Api config / ES module
 * @module api.config
 */

const NODE_ENV = process.env.NODE_ENV
const apisMap = {
  development: {
    WEBSITE: 'http://localhost:4000',//博客地址
    BASE: 'http://192.168.68.130/api', //接口地址
    MUSIC: 'http://www.kedong.me:9999/playlist/detail?id=4992612670',//歌单地址
    MUSIC_BASEURL:'http://www.kedong.me:9999',
  },
  production: {
    WEBSITE: 'https://www.kedong.me',
    BASE: 'https://www.kedong.me/api',
    MUSIC: 'http://www.kedong.me:9999/playlist/detail?id=4992612670',
    MUSIC_BASEURL:'http://www.kedong.me:9999',
  }
}

export default apisMap[NODE_ENV]
