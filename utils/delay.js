/**
 * 请求延时
 */

import appConfig from '~/config/app.config'
import { isBrowser } from '~/environment'

export const fetchDelay = (delay) => {

  delay = delay != null ? delay : appConfig.fetch.delay
  const start = new Date().getTime()

  return (action) => {

    const end = new Date().getTime()
    const time = end - start
    console.log("time",time)
    const timeout = delay - time
    const isDelay = isBrowser && timeout > 0
    isDelay ? window.setTimeout(action, timeout) : action()
  }
}
