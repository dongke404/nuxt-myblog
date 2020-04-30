
<template>
  <div class="photo-container">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in photo.album" :key="index">
        <div>
          <div class="imgBx">
            <img :src="item.img" />
          </div>
          <div class="details">
            <h3>
              {{item.name}}
              <br />
              <span>{{item.description}}</span>
            </h3>
          </div>
        </div>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <Album ref="album" :photos="photos"  @updateData="updateData"></Album>
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
    console.log(8888888, params.photo_album);
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
      // console.log(this.photo.photos);
      return this.photo.photos.map(item => {
        item.src = item.img;
        item.href = item.img;
        return item;
      });
    }
  },
  methods: {
    updateData() {
      this.currPage += 1;
      console.log(99999999999,this.photo.totalPage)
      if (this.currPage > this.photo.totalPage) {
        console.log(this.$refs.album)
        this.$refs.album.loadover()
      } else {
        this.$store.dispatch("photo/fetchPhotoList", {
          album: this.$route.params.photo_album,
          page: this.currPage
        });
      }
    },

    // nextPageParams() {
    //   return {
    //     album: params.photo_album,
    //     page: this.currPage + 1
    //   };
    // }
  },
  // watch: {
  //   $route(newVel, oldVel) {
  //     this.currPage=1
  //   }
  // },
  data() {
    return {
      currPage: 1,


      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 40,
          stretch: 0,
          depth: 500,
          modifier: 1,
          slideShadows: true
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


