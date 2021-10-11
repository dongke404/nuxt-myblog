<template>
  <div class="movie-container" v-if="!isMobile">
    <div class="head">
      {{currMovie}}
    </div>
    <div class="body">
      <div class="video-player-box"
          :playsinline="playsinline"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)"
          v-video-player:myVideoPlayer="playerOptions">
      </div>
      <div class="movielist">
        <div >电影列表</div>
        <div v-for="(item,index) in movielist" @click="change(item)" :key="index">
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
        <div class="video-player-box"
            :playsinline="playsinline"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @ready="playerReadied"
            @statechanged="playerStateChanged($event)"
            v-video-player:myVideoPlayer="playerOptions">
        </div>
        <div class="movielist">
          <div >电影列表</div>
          <div class="namebox" >
            <div v-for="(item,index) in movielist" @click="change(item)" class="name" :key="index">
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
        // component options
        playsinline: true,
        currMovie: "",
        // videojs options
        playerOptions: {
          width:960,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          },
          ],
          // poster: "/static/images/author.jpg",
        }
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
      this.currMovie = this.movielist[0]
      this.playerOptions.sources=[
          { src: `https://www.kedong.me/static/video/${this.movielist[0]}`, type: 'video/mp4'},
          ]
      if(this.isMobile){
        let width=this.$refs.moviebox.offsetWidth
         this.playerOptions.width=width
      }
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
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // console.log('example 01: the player is readied', player)
      }
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
