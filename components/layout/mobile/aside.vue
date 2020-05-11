<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <img :src="mobileAvatar" alt="dongke" draggable="false" />
      </div>
      <div class="profile">
        <h3 class="name">Kirk Dong</h3>
        <p class="slogan" v-text="$i18n.slogan.value"></p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <nuxt-link to="/" class="item" exact>
          <i class="iconfont icon-home"></i>
          <span v-text="$i18n.nav.home.value"></span>
        </nuxt-link>
        <nuxt-link to="/category/code" class="item">
          <i class="iconfont icon-code1"></i>
          <span v-text="$i18n.nav.code.value"></span>
        </nuxt-link>
        <nuxt-link to="/category/think" class="item">
          <i class="iconfont icon-think"></i>
          <span v-text="$i18n.nav.think.value"></span>
        </nuxt-link>
        <nuxt-link to="/category/life" class="item">
          <i class="iconfont icon-life"></i>
          <span class="text" v-text="$i18n.nav.life.value"></span>
        </nuxt-link>
        <nuxt-link to="/timeline" class="item">
          <i class="iconfont icon-date"></i>
          <span class="text" v-text="$i18n.nav.timeline.value"></span>
        </nuxt-link>
        <nuxt-link to="/guestbook" class="item guestbook">
          <i class="iconfont icon-guestbook"></i>
          <span class="text" v-text="$i18n.nav.guestbook.value"></span>
        </nuxt-link>
        <nuxt-link to="/about" class="item">
          <i class="iconfont icon-personInfo"></i>
          <span class="text" v-text="$i18n.nav.about.value"></span>
        </nuxt-link>
        <a :href="links.Mysite" target="_blank" class="item" rel="external nofollow noopener">
          <i class="iconfont icon-shequ1"></i>
          <span class="text" v-text="'MYSITE'"></span>
          <span class="superscript">
            <i class="iconfont icon-hot"></i>
          </span>
        </a>
      </nav>
    </div>
  </aside>
</template>

<script>
import Vue from "vue";
import {links,personInfo} from "~/config/app.config";

export default Vue.extend({
  name: "MobileAside",
  props: {
    open: {
      type: Boolean,
      defualt: false
    }
  },
  mounted() {
    // return this.$store.dispatch("global/fetchAdminInfo");
  },
  computed: {
    links: () => links,
    mobileAvatar:()=>personInfo.mobileAvatar
  }
});
</script>

<style lang="scss" scoped>
aside {
  display: block;
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  transform: scale(0.8, 0.8);
  transition: $mobile-aisde-transition;

  &.open {
    opacity: 1;
    transform: scale(1, 1);
  }

  > .aside-user {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: $gap;
    border-bottom: 1px solid darken($mobile-aside-bg, 5%);

    > .avatar {
      width: 35%;

      > img {
        max-width: 100%;
        border: 2px solid $module-bg;
      }
    }

    > .profile {
      color: $body-bg;
      width: 100%;

      > .name {
        font-weight: bold;
        margin-bottom: $gap;
      }

      > .slogan {
        margin: 0;
        color: $primary;
        @include text-overflow();
      }
    }
  }

  > .aside-nav {
    width: 100%;

    .nav-list {
      padding: 0;
      margin: 0;

      .item {
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        margin-bottom: 0.5em;
        border: none;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        color: $module-bg;

        &.app {
          margin-top: $gap;
          color: $primary;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          color: $primary;
          background-color: $body-bg;
        }

        &.link-active {
          color: $primary;
          font-weight: bold;
          background-color: $body-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
}
</style>
