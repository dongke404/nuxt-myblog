/**
 * @file 标签数据状态 / ES module
 * @module store/tag
 */

export const TIMELINE_API_PATH = '/timeline'

export const state = () => {
  return {
    fetching: false,
    data: {}
  }
}

export const mutations = {
  updateFetching(state, action) {
    state.fetching = action
  },
  updateListData(state, action) {
    state.data = action.data
  }
}

export const actions = {
  fetchList({ commit }) {
    commit('updateFetching', true)
    return this.$axios
      .$get(TIMELINE_API_PATH )
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(() => {
        commit('updateFetching', false)
      })
  }
}
