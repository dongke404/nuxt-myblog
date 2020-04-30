<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="text" v-text="$i18n.nav.home.value"></span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code1"></i>
        <span class="text" v-text="$i18n.nav.code.value"></span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-think"></i>
        <span class="text" v-text="$i18n.nav.think.value"></span>
      </nuxt-link>
      <nuxt-link to="/category/life" class="item">
        <i class="iconfont icon-life"></i>
        <span class="text" v-text="$i18n.nav.life.value"></span>
      </nuxt-link>
      <nuxt-link to="/timeline" class="item">
        <i class="iconfont icon-date"></i>
        <span class="text" v-text="$i18n.nav.timeline.value"></span>
      </nuxt-link>
      <nuxt-link to="/photo" class="item">
        <i class="iconfont icon-photo"></i>
        <span class="text" v-text="$i18n.nav.photo.value"></span>
      </nuxt-link>
      <nuxt-link to="/vlog" class="item">
        <i class="iconfont icon-vlog"></i>
        <span class="text" v-text="$i18n.nav.vlog.value"></span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item guestbook">
        <i class="iconfont icon-guestbook"></i>
        <span class="text" v-text="$i18n.nav.guestbook.value"></span>
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <i class="iconfont icon-personInfo"></i>
        <span class="text" v-text="$i18n.nav.about.value"></span>
      </nuxt-link>

      <a
        :href="links.Mysite"
        target="_blank"
        class="item ad aliyun"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-shequ1"></i>
        <span class="text" v-text="'MYSITE'"></span>
        <span class="superscript">
          <i class="iconfont icon-hot"></i>
        </span>
      </a>
    </nav>
  </div>
</template>

<script>
import { links } from "~/config/app.config";
export default {
  name: "PcNav",
  computed: {
    links: () => links
  }
};
</script>

<style lang="scss" scoped>
.aside-nav {
  width: $navbar-width;
  height: auto;
  margin-right: $lg-gap;
  user-select: none;

  .nav-list {
    width: $navbar-width;
    padding: 0;
    margin: 0;
    position: fixed;

    &.en {
      .item {
        .text {
          font-size: $font-size-h6;
        }
      }
    }

    .item {
      border: none;
      display: block;
      position: relative;
      width: 100%;
      height: 3em;
      line-height: 3em;
      padding: 0 $lg-gap;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 1px;
      color: $text-secondary;
      font-family: "webfont-normal", DINRegular;
      letter-spacing: 0.5px;
      margin-bottom: $sm-gap;
      @include color-transition();

      &:hover {
        color: $primary;
      }

      > .superscript {
        margin-left: $xs-gap;

        @keyframes superscript-icon-color {
          0% {
            color: $accent;
          }
          30% {
            color: $primary;
          }
          60% {
            color: $black;
          }
          80% {
            color: $red;
          }
        }

        > .iconfont {
          margin-right: 0;
          color: $red;
          transition: color 0s;
          animation: superscript-icon-color 0.66s infinite;
        }
      }

      &:not(.ad) + .ad {
        border-top: 1px dashed $module-hover-bg;
      }

      &.ad {
        height: 5rem;
        line-height: 5rem;
        border-bottom: 1px dashed $module-hover-bg;
        margin: 0;
      }

      &.holiday {
        color: red;
      }

      &.taobao {
        color: #ff5000;
      }

      &.aliyun {
        color: #ff6a00;
      }

      &.throwerror {
        color: black;
      }

      &.foxfinder {
        color: #d15d26;
      }

      &.app {
        color: $primary;

        > .iconfont {
          color: $primary;
        }
      }

      &:last-child {
        margin-top: 1rem;
        margin-bottom: 0;
      }

      &.link-active {
        font-weight: bold;
        color: $primary;
        background-color: $module-bg;

        &.guestbook {
          background: linear-gradient(to bottom, $module-bg, transparent);
        }
      }

      .iconfont {
        width: 1em;
        margin-right: $gap;
        display: inline-block;
      }
    }
  }
}
</style>
