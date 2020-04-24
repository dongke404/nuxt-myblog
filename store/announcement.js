/**
 * @file 公告数据状态 / ES module
 * @module store/announcement

 */

export const ANNOUNCEMENT_API_PATH = '/announcement'

export const state = () => {
  return {
    fetching: false,
    data: []
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
  fetchList({ commit }, params) {
    commit('updateFetching', true)
    return this.$axios
      .$get(ANNOUNCEMENT_API_PATH, { params })
      .then(response => {
        commit('updateListData', response)
        commit('updateFetching', false)
      })
      .catch(error => {
        commit('updateFetching', false)
      })
  }
}
