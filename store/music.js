
import apiconfig from "~/config/api.config"

export const state = () => {
  return {
    data: []
  }
}

export const mutations = {
  updateListData(state, action) {
    state.data = action
  }
}

export const actions = {
  fetchList({ commit }) {
    let prom=new Promise((reslove,rej)=>{
      this.$axios
      .$get(apiconfig.MUSIC)
      .then(response => {
        let ids=response.playlist.trackIds
        let idslist =[]
        for (const item of ids) {
          idslist.push(item.id)
        }
        let idstr = idslist.join(",")
        this.$axios.$get(`http://www.dongkirk.xyz/song/detail?ids=${idstr}`).then(res=>{
          if (response.code===200){
            reslove(res.songs)
          }
        })

      })
    })
    return prom.then(v=>{
      commit('updateListData', v)
    })
  }
}
