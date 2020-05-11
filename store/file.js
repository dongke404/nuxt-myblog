export const FILE_API_PATH = "/file";

export const state = () => {
  return {
    data: [],
    total:""
  };
};
export const mutations = {
  updateListData(state, action) {
    state.data = action.data;
    state.total = action.total
  }
};

export const actions = {
  fetchList({ commit },params={}) {
    return this.$axios
      .$get(FILE_API_PATH,{params})
      .then(response => {
        commit("updateListData", response);
      })
      .catch(() => {
        console.warn("请求异常");
      });
  }
};
