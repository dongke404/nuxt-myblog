
import Vue from 'vue'
const ALBUM_PATH = "/album";
const PHOTO_PATH = "/photo";

export const state = () => {
  return {
    album: [],
    photos: [],
    totalPage: 1
  };
};

export const mutations = {
  updateAlbumList(state, action) {
    state.album = action.data;
  },
  updatePhotoList(state, action) {
    state.photos = state.photos.concat(action.data);
    state.totalPage = action.total_page;
  },
  clearPhotoList(state, action) {
    state.photos = [];
  }
};

export const actions = {
  fetchAlbumList({ commit }) {
    return this.$axios
      .$get(ALBUM_PATH)
      .then(response => {
        commit("updateAlbumList", response);
      })
      .catch(() => {
        console.warn("图集请求失败");
      });
  },
  fetchPhotoList({ commit }, params = {}) {


    return this.$axios
      .$get(PHOTO_PATH, { params })
      .then(response => {
        if (params.page === 1 ) {
          commit("clearPhotoList");
          if (process.browser && params.album){
            Vue.nextTick(() => {
              scrollTo({
                top:450,
                behavior: "smooth"
              })
            })
          }

        }
        // console.log(22222222, response)
        commit("updatePhotoList", response);

      })
      .catch(() => {
        console.warn("图集请求失败");
      });
  }
};
