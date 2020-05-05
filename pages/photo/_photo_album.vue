<template>
  <div class="photo-container">
    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in photo.album" :key="index">
        <nuxt-link :to="`/photo/${item.name}`">
          <div>
            <div class="imgBx">
              <img :src="item.img" />
            </div>
            <div class="details">
              <h3>
                {{ item.name }}
                <br />
                <span>{{ item.description }}</span>
              </h3>
            </div>
          </div>
        </nuxt-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <Album ref="album" :photos="photos" @updateData="updateData"></Album>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Album from "~/components/common/album";

export default {
  name: "PhotoAlbum",
  title: "PhotoAlbum",
  components: {
    Swiper,
    SwiperSlide,
    Album
  },
  // validate({ params, store }) {
  //   return params.photo_album && !isNaN(Number(params.photo_album));
  // },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch("photo/fetchAlbumList"),
      store.dispatch("photo/fetchPhotoList", {
        album: params.photo_album,
        page: 1
      })
    ]);
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
    // totalPage() {
    //   return this.$store.state.totalPage;
    // },
    photos() {
      return this.photo.photos.map(item => {
        item.src = item.img;
        item.href = item.img;
        return item;
      });
    },

    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    updateData() {
      // console.log("触发")
      this.currPage += 1;
      if (this.currPage > this.photo.totalPage) {
        this.$refs.album.loadover();
      } else {
        this.$store.dispatch("photo/fetchPhotoList", {
          album: this.$route.params.photo_album,
          page: this.currPage
        });
      }
    }
  },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(Math.floor(this.photo.album.length / 2), 1000, false);
  },

  watch: {
    $route(newVel, oldVel) {
      this.currPage = 1;
    }
  },
  destroyed() {
    this.$store.commit("photo/clearPhotoList");
  },
  data() {
    return {
      currPage: 1,
      swiperOption: {
        activeIndex: 5,
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 40,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: true
          // centerInsufficientSlides:true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.photo-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 50px;
}

.swiper {
  height: 420px;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 380px;
    text-align: center;
    font-weight: bold;

    background-color: #fff;
    background-position: center;
    background-size: cover;
    color: black;
    .imgBx {
      width: 100%;
      height: 300px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    details {
      box-sizing: border-box;
      padding: 20px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        span {
          font-size: 16px;
          color: #f44336;
        }
      }
    }
  }

  .swiper-pagination {
    /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: $white;
    }
  }
}
</style>
