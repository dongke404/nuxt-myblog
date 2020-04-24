<template>
  <div id="app-main">
    <Header />
    <Background />
    <language />
    <theme-switch />
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
import NavView from "./nav";
import Header from "@/components/layout/pc/header";
import AsideView from "./aside/main";
import Language from "~/components/widget/language";
import ThemeSwitch from "~/components/widget/theme";
import FooterView from './footer'

export default {
  name: "PcMain",
  components: {
    Background,
    NavView,
    Header,
    AsideView,
    Language,
    ThemeSwitch,
    FooterView
  },
  mounted() {
    if (process.browser) {
      // this.autoEggWhenTabActive();
      this.$store.commit("global/resetTheme");
      // this.$root.$musicPlayer = musicPlayer;
      // musicPlayer.ready || musicPlayer.init();
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
