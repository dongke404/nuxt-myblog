
import apiconfig from "~/config/api.config"

export const state = () => {
  return {
    data: []
  }
}

export const mutations = {
  updateListData(state, action) {
    state.data = action.playlist.tracks
  }
}

export const actions = {
  fetchList({ commit }) {
 
    return this.$axios
      .$get(apiconfig.MUSIC)
      .then(response => {
        if (response.code===200){
          commit('updateListData', response)
        }
      })
      .catch(() => {
        alert("音乐列表请求失败")
      })
  }
}
