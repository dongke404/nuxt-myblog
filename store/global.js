/**
 * @file 全局设置数据状态 / ES module
 * @module store/option

 */
import i18nConfig from '~/config/i18n.config'
import systemConstants from '~/constants/system'
import { getStorageReader } from '~/utils/local-storage'


const localThemeReader = getStorageReader(systemConstants.StorageField.Theme)

export const state = () => ({
  // 拿本地设置过得的主题作为默认
  theme: systemConstants.Theme.Default,

  // fontcss
  fontcss: "",
  // ua
  userAgent: '',

  // 默认语言
  language: i18nConfig.default,

  // 页面的栏目展示类型（3栏/2栏）
  isTwoColumns: false,
  isThreeColumns: false,
  isFullViewWidth:false,

  // 是否为移动端
  isMobile: false,

  // 是否中文用户
  isZHUser: true,

  // 移动端侧边栏
  onMobileSidebar: false,


  // 服务端设置的全局配置
  appOption: {
    fetching: false,
    data: null
  }
})

export const getters = {
  isMobile: state => state.isMobile,
}

export const mutations = {
  // 主题
  updateTheme(state, action) {
    state.theme = action
    localThemeReader.set(action)
  },
  resetTheme(state) {
    const historyTheme = localThemeReader.get()
    if (historyTheme) {
      state.theme = historyTheme
    }
  },

  // 设置fontcss
  updateFontcss(state, action) {
    state.fontcss = action.data
  },

  // 设置UA
  updateUserAgent(state, action) {
    state.userAgent = action
  },



  // 设置是否移动端状态
  updateMobileState(state, action) {
    state.isMobile = action
  },

  // 切换移动端侧边栏
  updateMobileSidebarOnState(state, action) {
    state.onMobileSidebar = action
  },

  // 设置两栏页面结构
  updateTwoColumnsState(state, action) {
    state.isTwoColumns = action
  },

  // 设置三栏页面结构
  updateThreeColumnsState(state, action) {
    state.isThreeColumns = action
  },
  // 设置两栏页面结构
  updateTwoColumnsState(state, action) {
    state.isTwoColumns = action
  },

  // 设置满屏页面结构
  updateFullColumnsState(state, action) {
    state.isFullViewWidth = action
  },

  // 喜欢本站
  updateSiteLikes(state) {
    state.appOption.data.meta.likes++
  },


  // 切换语言
  updateLanguage(state, action) {
    state.language = action
  },

  // 用户身份
  updateZHState(state, action) {
    state.isZHUser = action
  },


  // 服务端配置
  updateAppOptionFetching(state, action) {
    state.appOption.fetching = action
  },
  updateAppOptionData(state, action) {
    state.appOption.data = action.data
  },
  updateLikesIncrement(state) {
    state.appOption.data.likes++
  }
}

export const actions = {
  // 获取font的地址
  fetchFontcss({ commit }) {
    return this.$axios
      .$get('/fontcss')
      .then(response => commit('updateFontcss', response))
  },


  // 获取全局配置
  fetchAppOption({ commit, state }, force = false) {
    if (!force && state.appOption.data) {
      return Promise.resolve()
    }
    commit('updateAppOptionFetching', true)
    return this.$axios
      .$get(`/siteOption`)
      .then(response => {
        commit('updateAppOptionData', response)
        commit('updateAppOptionFetching', false)
      })
      .catch(() => commit('updateAppOptionFetching', false))
  },

  // 喜欢主站
  fetchLikeSite({ commit }) {
    return this.$axios.$post(`/like/site`).then(response => {
      commit('updateLikesIncrement')
      return Promise.resolve(response)
    })
  }
}

