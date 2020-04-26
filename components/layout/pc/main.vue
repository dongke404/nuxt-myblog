<template>
  <div id="app-main" >
    <Link rel='styleSheet' type='text/css' :href='fontcss' />
    <client-only>
      <figure class="widget">
        <background />
        <wallflower />
        <language />
        <theme-switch />
        <back-to-top />
        <share-box class="sidebar-share" />
      </figure>
    </client-only>
    <Header />
    <main id="main" class="main-container">
      <nav-view />
      <div id="main-content" class="main-content">
        <nuxt :nuxt-child-key="$route.name" />
      </div>
      <aside-view v-if="!isTwoColumns && !isThreeColumns" key="aside" />
    </main>
    <footer-view />
  </div>
</template>

<script>
import Background from "../../widget/background.vue";
import Wallflower from "~/components/widget/clickEffect/garden";
import NavView from "./nav";
import Header from "~/components/layout/pc/header";
import AsideView from "./aside/main";
import Language from "~/components/widget/language";
import ThemeSwitch from "~/components/widget/theme";
import FooterView from "./footer";
import BackToTop from "../../widget/back2top";
import ShareBox from "~/components/widget/share";

export default {
  name: "PcMain",
  components: {
    Wallflower,
    ShareBox,
    BackToTop,
    Background,
    NavView,
    Header,
    AsideView,
    Language,
    ThemeSwitch,
    FooterView
  },
  computed: {
    fontcss() {
      console.log("33333333", this.$store.state.global.fontcss.fontcss);
      return this.$store.state.global.fontcss.fontcss;
    }
  },
  created() {},
  mounted() {
    if (process.browser) {
      this.$store.commit("global/resetTheme");
    }
  }
};
</script>

<style lang="scss" scoped>
#app-main {
  padding-top: $mobile-header-height + $lg-gap;

  @media screen and (max-width: 1200px) {
    #theme,
    #language,
    .sidebar-share {
      display: none !important;
    }
  }

  .sidebar-share {
    position: fixed;
    top: 12%;
    left: 0;
    height: auto;
    max-width: 4rem;
    display: flex;
    flex-direction: column;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }

    &::v-deep > .share-ejector {
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      font-size: 18px;
      transition: width $transition-time-fast;

      &.renren,
      &.evernote,
      &.linkedin,
      &.mail {
        display: none;
      }

      &:hover {
        width: 120%;
      }
    }
  }

  .main-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: $container-width;

    &.full-view {
      width: 100%;
    }

    .main-content {
      width: $main-width;
      position: relative;
      overflow: hidden;
      transition: none;

      &:-moz-full-screen {
        overflow-y: auto;
      }

      &:-webkit-full-screen {
        overflow-y: auto;
      }

      &:fullscreen {
        overflow-y: auto;
      }

      &.two-column {
        flex-grow: 1;
      }

      &.three-column {
        width: 100%;
        margin: 0;
      }

      &.full-view {
        width: 100%;
        margin: -$lg-gap 0;
      }
    }
  }
}
</style>
