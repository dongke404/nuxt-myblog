<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="about-me">
      <div class="description">
        <div class="item">
          <i class="iconfont icon-swordsman" style="color:red" />
          <p class="bio">
            <span>{{ "董柯，Kirk Dong, Dong ke" }}</span>
          </p>
        </div>
        <div class="item">
          <i class="iconfont icon-sponsor" style="color:gold"></i>
          <a target="_blank" href="#" rel="external nofollow noopenter">PayPal me</a>
        </div>
        <div class="item">
          <i class="iconfont icon-music" style="color:green" />
          <span class="music">
            <nuxt-link to="/music">Rap, Rock, Popular</nuxt-link>
            <a
              href="https://music.163.com/#/playlist?id=638949385"
              target="_blank"
              class="music-163"
              rel="external nofollow noopenter"
            >
              <span class="iconfont icon-163music" />
            </a>
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-social" />
          <span class="social-media-accounts">
            <span class="normal">
              <a
                href="https://github.com/dongke404"
                target="_blank"
                class="item github"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-github" />
                <span class="text">GitHub</span>
              </a>
              <a
                href="https://twitter.com/DongKirk11"
                target="_blank"
                class="item twitter"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-twitter" />
                <span class="text">Twitter</span>
              </a>
              <a href="#" target="_blank" class="item instagram" rel="external nofollow noopenter">
                <i class="iconfont icon-instagram" />
                <span class="text">Instagram</span>
              </a>
            </span>
            <span v-if="!isMobile" class="mini">
              <a href="#" target="_blank" class="item zhihu" rel="external nofollow noopenter">
                <i class="iconfont icon-zhihu" />
              </a>
            </span>
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-hobby" style="color:pink" />
          <span class="like-text">{{ personInfo.hobby }}</span>
        </div>
        <div class="item">
          <i class="iconfont icon-address" style="color:#33ff33" />
          <a href="#" class="address">{{personInfo.address}}</a>
        </div>
        <div class="item">
          <i class="iconfont icon-friendlink" style="color:#BF3EFF" />
          <span class="friends">
            <a
              v-for="(link, name) in friendLinks"
              :key="link"
              :href="link"
              target="_blank"
              rel="external nofollow noopenter"
            >「 {{ name }} 」</a>
          </span>
        </div>
      </div>
      <div class="gravatar" v-if="!isMobile">
        <div class="card middle">
          <div class="front">
            <img :src="personInfo.aboutmeImg" alt />
          </div>
          <div class="back">
            <div class="back-content middle">
              <h2>DongKirk</h2>
              <span>计算机菜鸟</span>
              <div class="sm">
                <a href>
                  <i class="iconfont icon-zhihu" />
                </a>
                <a href>
                  <i class="iconfont icon-instagram" />
                </a>
                <a href>
                  <i class="iconfont icon-twitter" />
                </a>
                <a href>
                  <i class="iconfont icon-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告 -->
    <!-- <a
      v-if="!isMobile"
      class="about-aliyun-mammon"
      rel="external nofollow noopener"
      target="_blank"
      :href="adConfig.url"
    >
      <img :src="adConfig.src">
    </a>-->
    <div class="about-introduce">
      关于我：
      <p>92年的最后一个月，诞生于越剧发源地的一个小城市，未完待续</p>
    </div>
  </div>
</template>

<script>
import { friendLinks, personInfo } from "~/config/app.config";
import systemConstants from "~/constants/system";

export default {
  name: "About",
  head() {
    return {
      title: `${this.$i18n.nav.about.value + " | "}About`
    };
  },
  // fetch({ store }) {
  //   return store.dispatch('global/fetchAdminInfo')
  // },
  computed: {
    personInfo: () => personInfo,
    friendLinks: () => friendLinks,
    isMobile() {
      return this.$store.state.global.isMobile;
    },
    gravatar() {
      return this.$store.state.global.adminInfo.gravatar;
    }
  }
};
</script>

<style lang="scss" scoped>
.about-page {
  width: 100%;
  overflow: hidden;

  .about-me {
    width: 100%;
    height: auto;
    margin-bottom: $lg-gap;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    > .description {
      min-width: 53rem;
      flex-grow: 1;
      padding: 2rem 3rem;
      background-color: $module-bg;

      > .item {
        line-height: 2.5em;
        min-height: 2.5em;
        margin-bottom: 1.2rem;
        &:last-child {
          margin-bottom: 0;
        }

        > .iconfont {
          width: 2em;
          margin-right: 1em;
          display: inline-block;
          font-size: $font-size-h4;
          text-align: center;
          color: $text-dividers;

          &.icon-social {
            color: #ffa800;
          }

          &.icon-tibet-1 {
            color: $primary;
          }

          &.icon-like {
            color: $red;
          }

          &.icon-friend {
            color: $accent;
          }
        }

        > .bio {
          display: inline-block;

          margin: 0;
        }

        > .like-text {
          font-family: "webfont-bolder", DINRegular;
        }

        > .address {
          border-bottom: 1px solid;

        }

        > .music {
          .spotify {
            margin-left: $xs-gap;
            color: #1db954;
          }

          .music-163 {
            color: #c20c0c;
          }
        }

        > .friends {
          > a {
            margin-right: 1em;
            text-transform: capitalize;
          }
        }

        > .social-media-accounts {
          $button-size: 2rem;

          > .normal {
            > .item {
              display: inline-block;
              height: $button-size;
              line-height: $button-size;
              padding: 0 $sm-gap;
              margin-right: $sm-gap;
              border-radius: $radius * 2;
              color: $text-reversal;
              user-select: none;
              @include background-transition();

              > .text {
                font-size: $font-size-small;
              }

              &.github {
                background-color: #24282d;
                &:hover {
                  background-color: #000;
                }
              }

              &.twitter {
                background-color: #1b95e0;
                &:hover {
                  background-color: #0c7abf;
                }
              }

              &.instagram {
                opacity: 0.8;
                background: #f09433;
                background: linear-gradient(
                  45deg,
                  #f09433 0%,
                  #e6683c 25%,
                  #dc2743 50%,
                  #cc2366 75%,
                  #bc1888 100%
                );
                @include visibility-transition();

                &:hover {
                  opacity: 1;
                }
              }
            }
          }

          > .mini {
            > .item {
              display: inline-block;
              width: $button-size;
              height: $button-size;
              line-height: $button-size;
              margin-right: $sm-gap;
              text-align: center;
              border-radius: 100%;
              color: $text-reversal;
              opacity: 0.8;
              @include visibility-transition();

              &:hover {
                opacity: 1;
              }

              .iconfont {
                font-size: $font-size-small;
              }

              &.telegram {
                background-color: #54a5dd;
              }
              &.zhihu {
                background-color: #3582f7;
              }
              &.youtube {
                background-color: #ec3323;
              }
              &.bilibili {
                background-color: #449fd1;
              }
              &.stackoverflow {
                background-color: #e6863d;
              }
              &.algorithm {
                background-color: #fea116;
              }
              &.quora {
                background-color: #b92b27;
              }
              &.linkedin {
                background-color: #478cc5;
              }
            }
          }
        }
      }
    }

    .gravatar {
      width: 340px;
      // height: 300px;
      font-family: "montserrat";
      position: relative;
      .middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .card {
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
      .front,
      .back {
        width: 100%;
        height: 100%;
        overflow: hidden;
        backface-visibility: hidden;
        position: absolute;
        transition: transform 0.6s linear;
      }
      .front img {
        height: 100%;
      }
      .front {
        transform: perspective(600px) rotateY(0deg);
      }
      .back {
        background: #f1f1f1;
        transform: perspective(600px) rotateY(180deg);
      }
      .back-content {
        color: #2c3e50;
        text-align: center;
        width: 100%;
      }
      .sm {
        margin: 20px 0;
      }
      .sm a {
        display: inline-flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        color: #2c3e50;
        font-size: 18px;
        transition: 0.4s;
        border-radius: 50%;
      }
      .sm a:hover {
        background: #2c3e50;
        color: white;
      }
      .card:hover > .front {
        transform: perspective(600px) rotateY(-180deg);
      }
      .card:hover > .back {
        transform: perspective(600px) rotateY(0deg);
      }
    }
  }

  .about-introduce {
    min-height: 20rem;
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: $sm-gap;
    margin-bottom: $lg-gap;
    background-color: $module-bg;
  }

  &.mobile {
    margin: 0;

    > .about-me,
    > .about-map {
      margin-bottom: $gap;
    }

    > .about-me {
      flex-direction: column-reverse;

      > .gravatar {
        width: 100%;
        margin-left: 0;
        margin-bottom: $gap;
        flex-direction: row;
        padding: $lg-gap 0;

        > .background {
          height: 100%;

          &.star-1,
          &.star-2 {
            > .image {
              width: 4rem;
            }
          }

          > .image {
            width: 200%;
            height: auto;
          }
        }

        > .avatar {
          width: 6rem;
          height: 6rem;
          margin-top: 0;
          margin-left: 6%;
        }

        > .description {
          width: 50%;
          margin-left: 5%;
          text-align: left;
          z-index: $z-index-normal + 1;
          color: $text-reversal;

          > .name,
          > .skill {
            margin: 1rem 0;
          }
        }

        > .favorite {
          margin: 1rem 0;
          margin-bottom: 2rem;
        }
      }

      > .description {
        width: 100%;
        padding: 1em;
        overflow: hidden;

        > .item {
          @include text-overflow();

          > .iconfont {
            margin-right: $sm-gap;
          }
        }
      }
    }
  }
}
</style>
