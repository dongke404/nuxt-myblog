import Vue from 'vue'


export const ARTICLE_API_PATH = '/article'
// export const LIKE_ARTICLE_API_PATH = '/like/article'
import { isBrowser } from '~/environment'
// import { fetchDelay } from '~/utils/delay'
// import systemConstants from '~/constants/system'

const getDefaultListData = () => {
  return {
    data: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    list: {
      fetching: false,
      data: getDefaultListData()
    },
    hotList: {
      fetching: false,
      data: []
    },
    detail: {
      fetching: true,
      data: {}
    },
  }
}

export const mutations = {
  // 文章列表
  updateListFetchig(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data = action
  },
  updateExistingListData(state, action) {
    state.list.data.data.push(...action.data)
    state.list.data.pagination = action.pagination
  },
  // 文章详情
  updateDetailFetchig(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },
  temptest(state, action) {
    state.testdata = action
  },
}

export const actions = {
  showsDelay({ commit }) {
    // console.log("假睡888骨架屏显示")
    setTimeout(() => { commit('updateDetailFetchig', false) }, 888)
  },

  // 获取文章列表
  fetchList({ commit }, params = {}) {
    const isRestart = !params.page || params.page === 1
    const isLoadMore = params.page && params.page > 1

    // 清空已有数据
    isRestart && commit('updateListData', getDefaultListData())
    commit('updateListFetchig', true)

    return this.$axios
      .$get(ARTICLE_API_PATH, { params })
      .then(response => {
        commit('updateListFetchig', false)
        isLoadMore
          ? commit('updateExistingListData', response)
          : commit('updateListData', response)
        if (isLoadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo({
              top: window.scrollY + window.innerHeight * 0.8,
              behavior: "smooth"
            })
          })
        }
      })
      .catch(error => commit('updateListFetchig', false))
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {

    if (process.browser) {
      Vue.nextTick(() => {
        scrollTo(0, 300)
      })
    }
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return this.$axios
      .$get(`${ARTICLE_API_PATH}/${params.article_id}`)
      .then(response => {
        commit('updateDetailData', response.data)
        !process.browser && commit('updateDetailFetchig', false)
      })
      .catch(error => {
        commit('updateDetailFetchig', false)

      })
  },

}
