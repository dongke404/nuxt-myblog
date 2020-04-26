/**
 * @file 评论数据状态 / ES module
 * @module store/comment
 */

import { fetchDelay } from '~/utils/delay'
import { COMMENT_NUM } from "~/config/app.config";
export const COMMENT_API_PATH = '/comment'
export const LIKE_COMMENT_API_PATH = '/like/comment'


const getDefaultListData = () => {
  return {
    data: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: getDefaultListData()
  }
}

export const mutations = {
  // 请求列表
  updateListFetchig(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action
  },
  clearListData(state) {
    state.data = getDefaultListData()
  },

  // 发布评论
  updatePostFetchig(state, action) {
    state.posting = action
  },
  updateListNewItemData(state, action) {
    state.data.pagination.total += 1
    state.data.data.push(action.data)
  },

  // 喜欢某条评论
  updateLikesIncrement(state, action) {
    state.data.data.find(comment => {
      const isMatched = comment.comment_id === action.comment_id
      isMatched && comment.likes++
      return isMatched
    })
  }
}

export const actions = {
  fetchList({ commit }, params = {}) {
    // 修正参数
    params = Object.assign(
      {
        page: 1,
        page_num: COMMENT_NUM,
        sort: 1
      },
      params
    )
    // 清空数据
    commit('updateListData', getDefaultListData())
    //重新请求
    commit('updateListFetchig', true)
    //此处开始算start
    const delay = fetchDelay()

    return this.$axios
      .$get(COMMENT_API_PATH, { params })
      .then(response => {
        delay(() => {
          commit('updateListData', response);
          commit('updateListFetchig', false)
        }
        )
      })
      .catch(error => commit('updateListFetchig', false))
  },

  // 发布评论
  fetchPostComment({ commit }, comment) {
    commit('updatePostFetchig', true)
    return this.$axios
      .$post(COMMENT_API_PATH, comment)
      .then(response => {
        commit('updateListNewItemData', response)

        commit('updatePostFetchig', false)
        return Promise.resolve(response)
      })
      .catch(error => {
        commit('updatePostFetchig', false)
        return Promise.reject(error)
      })
  },

  // 喜欢评论
  fetchLikeComment({ commit }, comment) {
    return this.$axios
      .$post(LIKE_COMMENT_API_PATH, { comment_id: comment.comment_id })
      .then(response => {
        commit('updateLikesIncrement', comment)
        return Promise.resolve(response)
      })
  }
}
