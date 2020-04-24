import Vue from "vue"
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

Vue.use(dayjs)


export default dayjs
// dayjs(theme.pub_date).fromNow()
