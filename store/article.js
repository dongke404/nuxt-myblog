import Vue from 'vue'
import {SortType} from "~/constants/system"
export const ARTICLE_API_PATH = '/article'
export const LIKE_ARTICLE_API_PATH = '/like/article'


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


  // 热门文章
  updateHotListFetchig(state, action) {
    state.hotList.fetching = action
  },
  updateHotListData(state, action) {
    state.hotList.data = action
  },

  // 文章详情
  updateDetailFetchig(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },
  updateisPrivacy(state, action){
    state.detail.isPrivacy = action
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.likes++
  }
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
        if (isLoadMore && process.browser) {
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

  // 获取最热文章列表
  fetchHotList({ commit }) {

    commit('updateHotListFetchig', true)
    return this.$axios
      .$get(ARTICLE_API_PATH, { params: { cache: 1, sort: SortType.Hot } })
      .then(response => {
        commit('updateHotListData', response)
        commit('updateHotListFetchig', false)
      })
      .catch(error => commit('updateHotListFetchig', false))
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {
    if (process.browser) {
      console.log("浏览器")
      Vue.nextTick(() => {
        scrollTo(0, 300)
      })

    }
    this.$axios.defaults.withCredentials=true
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return this.$axios
      .$get(`${ARTICLE_API_PATH}/${params.article_id}`)
      .then(response => {
         if(response.status===403){
          commit('updateisPrivacy',false)
          }else{
          commit('updateisPrivacy',true)
          }
          commit('updateDetailData', response.data)
          !process.browser && commit('updateDetailFetchig', false)
          return  Promise.resolve(response)
      })
      .catch(error => {
        commit('updateDetailFetchig', false)
      })
  },
  // 喜欢文章
  fetchLikeArticle({ commit }, article_id) {
    return this.$axios
      .$post(LIKE_ARTICLE_API_PATH, { article_id })
      .then(response => {
        commit('updateLikesIncrement')
        return Promise.resolve(response)
      })
  }
}
