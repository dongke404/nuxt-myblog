<template>
  <div class="movie-container">
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
        <div v-for="item in movielist" @click="change(item)">
          {{item}}
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
          heighht:480,
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
      console.log('this is current player instance object', this.myVideoPlayer)
    },
    methods: {
      change(item){
        console.log(`https://www.kedong.me/static/video/${item}`)
        this.playerOptions.sources=[
          { src: `https://www.kedong.me/static/video/${item}`, type: 'video/mp4'},
          ]
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
        console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .movie-container{
    padding: 0px 50px;
    .head{
      margin:20px 0;
    }
    .body{
      display: flex;
    }

  }
  .movielist{
    padding: 0 10px;
  }
</style>
