<template>
  <div
    class="header-box"
    :class="theme"
    :style="{
      'background-image': `url(${currentData.backgroundImg})`
    }"
  >
    <div class="logo-box">
      <p class="logo">
        <transition name="module" mode="out-in">
          <i key="date" :class="`iconfont icon-${currentData.icon}`"></i>
        </transition>
      </p>
    </div>
    <div class="title-box">
      <transition name="module" mode="out-in">
        <h5 key="category-11" class="title">
          <span>{{ currentData.text }}</span>
        </h5>
      </transition>
    </div>
  </div>
</template>

<script>
import { routerMap } from "~/config/app.config";
export default {
  name: "ArticleListHeader",
  computed: {
    theme() {
      return this.$store.state.global.theme;
    },
    currentTag() {
      return this.$store.state.tag.data.find(
        tag => tag.name === this.$route.params.tag_name
      );
    },
    currentData() {
      // console.log(this.$route);
      if (this.$route.name === "category-category_slug") {
        return routerMap.category[this.$route.params.category_slug];
      }
      if (this.$route.name === "search-keyword") {
        routerMap.search.text = `搜索与  "${this.$route.params.keyword}"  相关的结果`;
        return routerMap.search;
      }
      if (this.$route.name === "date-date") {
        routerMap.date.text = `于  "${this.$route.params.date}"  发布的文章`;
        return routerMap.date;
      }
      if (this.$route.name === "tag-tag_name") {
        let data = {};
        data.backgroundImg = this.currentTag.img;
        data.icon = this.currentTag.icon;
        data.text = this.currentTag.description;
        return data;
      }
    },
    isMobile() {
      return this.$store.state.global.isMobile;
    }
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 16.4rem;
  background-size: cover;
  background-blend-mode: hue;
  background-color: $module-hover-bg-darken-10;
  background-position: center center;
  color: $text-reversal;

  &.dark {
    color: $text;
  }

  &.mobile {
    height: 12rem;

    > .logo-box {
      height: 8.6rem;

      > .logo {
        line-height: 8.6rem;

        > .iconfont {
          font-size: 5em;
        }
      }
    }
  }

  > .logo-box {
    height: 12rem;
    overflow: hidden;

    > .logo {
      margin: 0;
      line-height: 12rem;
      text-align: center;

      @keyframes logo-animate {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .iconfont {
        font-size: 6em;
        display: inline-block;
        animation: logo-animate 5s infinite;
      }
    }
  }

  > .title-box {
    height: 4rem;
    line-height: 2.5rem;

    > .title {
      margin: 0;
      text-align: center;
      text-transform: capitalize;
    }
  }
}
</style>
