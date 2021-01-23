<template>
  <header id="header" class="header">
    <div class="header-container container">
      <div class="header-header">
        <div class="header-logo">
          <h1>Kirk Dong</h1>
        </div>
        <span class="header-slogan">{{$i18n.slogan.value}}</span>
        <nuxt-link to="/" class="header-link" :title="$i18n.slogan.value" />
      </div>
      <div class="header-player">
        <audio
          ref="audio"
          :src="currMusic.url"
          autoplay
          name="media"
          :key="currMusic.url"
          @ended="playNext"
          @error="error"
        ></audio>
      </div>
      <div class="panel">
        <div class="button">
          <button @click="playPre">
            <i class="iconfont icon-music-prev"></i>
          </button>
          <button @click="playOrpluse">
            <i
              class="iconfont"
              :class="{'icon-music-play':ispaused,
            'icon-music-pause':!ispaused
             }"
            ></i>
          </button>
          <button @click="playNext">
            <i class="iconfont icon-music-next"></i>
          </button>
        </div>
        <div
          class="song"
          :title="currMusic.name"
        >歌名:{{currMusic.name}}&nbsp;&nbsp;</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PcHeader",
  data() {
    return {
      ispaused: false,
      currIndex: 0,
      errMusic: 0
    };
  },
  computed: {
    audio() {
      return this.$store.state.music.data
        .map(item => {
          // console.log(123,item)
          let res = {};
          res.name = item.name;
          // res.artist = item.ar[0].name;
          res.artist = item.artist
          res.url = `https://music.163.com/song/media/outer/url?id=${item.id}`;
          return res;
        })
        .sort(function() {
          return Math.random() > 0.5 ? -1 : 1;
        });
    },
    currMusic() {
      // console.log(this.audio)
      return this.audio[this.currIndex];
    },
    mLength() {
      return this.audio.length;
    }
  },
  methods: {
    playPre() {
      if (!this.currIndex) {
        this.currIndex = this.mLength - 1;
      } else {
        this.currIndex -= 1;
      }
    },
    playOrpluse() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.ispaused = false;
      } else {
        this.$refs.audio.pause();
        this.ispaused = true;
      }
    },
    playNext() {
      if (this.currIndex === this.mLength - 1) {
        this.currIndex = 0;
      } else {
        this.currIndex += 1;
      }
    },
    error() {
      if (this.errMusic === 100) {
        this.ispaused = true;
        this.errMusic = 0;
      } else {
        this.playNext();
        this.errMusic += 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  z-index: $z-index-header;
  background-color: $module-bg;
  user-select: none;
  // 过段时间再打开吧，闪屏太严重了
  // @include backdrop-blur();

  .header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;

    .header-header {
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      padding-left: $sm-gap;
      width: 29em;
      overflow: hidden;

      @keyframes logo-blink {
        0% {
          mask-position: -30%;
        }
        100% {
          mask-position: 666%;
        }
      }

      .header-logo {
        color: #ad6598;
        width: 11rem;
        margin-right: $gap * 4;
        mask-size: 88%;
        mask-position: -30%;
        mask-image: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.2)
        );
        animation: logo-blink 8s ease-in 1s infinite;
      }

      .header-slogan {
        color: $primary;
        font-family: "webfont-normal", DINRegular;
      }

      .header-link {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    .header-player {
      position: absolute;
      display: flex;
      top: 0px;
      right: 40rem;
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
      audio {
        opacity: 0.2;
      }
    }
    .panel {
      padding: 10px;
      margin-bottom: $xs-gap;
      width: 15rem;
      overflow: hidden;
      .button {
        display: flex;
        > button {
          margin-right: 10px;
          &:hover {
            .iconfont {
              color: $link-hover-color;
            }
          }
        }
      }
      .song {
        white-space: nowrap;
        opacity: 0.5;
        display: inline-block;
        animation: 8s wordsLoop linear infinite normal;
      }
      @keyframes wordsLoop {
        0% {
          transform: translateX(0px);
          -webkit-transform: translateX(0px);
        }
        100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
        }
      }
    }
    .iconfont {
      color: $text-dividers;
      @include color-transition();
    }
  }
}
</style>
