/**
 * 请求延时
 */

import { fetch } from '~/config/app.config'

export const fetchDelay = (delay) => {

  delay = delay != null ? delay : fetch.delay
  const start = new Date().getTime()

  return (action) => {

    const end = new Date().getTime()
    const time = end - start
    const timeout = delay - time
    const isDelay = process.browser && timeout > 0
    isDelay ? window.setTimeout(action, timeout) : action()
  }
}
