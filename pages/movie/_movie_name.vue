<template>
  <div class="movie-container" v-if="!isMobile">
    <div class="head">
      {{currMovie}}
    </div>
    <div class="body">
      <client-only>
        <Xgplayer :config="config" @player="Player = $event"/>
      </client-only>
      <div class="movielist">
        <div >电影列表</div>
        <div v-for="item in movielist" @click="change(item)" :key="item">
          {{item.slice(0,-4)}}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="float-box"  >
    <div  class="movie-container-m" ref="moviebox">
      <div class="head">
        {{currMovie}}
      </div>
      <div class="body">
         <client-only>
          <Xgplayer :config="config" @player="Player = $event"/>
        </client-only>
        <div class="movielist">
          <div >电影列表</div>
          <div class="namebox" >
            <div v-for="item in movielist" @click="change(item)" class="name" :key="item">
              {{item.slice(0,-4)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        config: {
          id: 'vs',
          url: 'https://www.kedong.me/static/video/肥龙过江.mp4',
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          width: 960,
          height: 480,
          videoInit: true,
          pip: true
        },
        Player: null
      }
    },
    fetch({ store }) {
      return store.dispatch("movielist/fetchList");
    },
    computed: {
      movielist() {
        return this.$store.state.movielist.data;
      },
      isMobile() {
        return this.$store.state.global.isMobile;
      }
    },

    mounted() {
      this.currMovie = this.movielist[0].slice(0,-4)
      if(this.isMobile){
        let width=this.$refs.moviebox.offsetWidth
        console.log(width)
        this.config.width=width
      }
      this.$forceUpdate();
      // console.log('this is current player instance object', this.myVideoPlayer)
    },
    methods: {
      change(item){
        console.log(`https://www.kedong.me/static/video/${item}`)
        this.playerOptions.sources=[
          { src: `https://www.kedong.me/static/video/${item}`, type: 'video/mp4'},
          ]
        this.currMovie=item.slice(0,-4)
        console.log(1234,this.currMovie)
        this.$forceUpdate();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .movie-container{
    padding: 0px 50px;
    margin: 0 auto;
    .head{

      text-align: center;
      margin:20px 0;
      margin-right: 250px;
      font-size: 30px;
    }
    .body{
      display: flex;
      justify-content: center;
      .movielist{
        width: 250px;
        font-size: 20px;
        padding: 0 10px;
      }
    }

  }
  .float-box{
    position: fixed;
    background: url("https://www.kedong.me/static/images/app/background.jpg") no-repeat;
    background-size:cover;
    width: 100vw;
    height: 100vh;
    top: 60px;
    left: 0;
    right: 0;
  }
  .movie-container-m {
    // margin: 10px;
    width: 100vw;
    min-height: 100vh;
    .head{
      font-size: 2rem;
      font-weight: 600;
      margin:1rem 2rem;
    }
    .body{
      display: block;
      .movielist{
        font-size: 1.8rem;
        color: black;
        margin-top: 1rem;
        margin-left: 1rem ;
        .namebox{
          .name{
            font-size: 1.5rem;
          }
        }

      }
    }
  }



</style>
