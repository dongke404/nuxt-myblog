<template>
  <div
    class="header-box"
    :style="{
      'background-image': `url(${currentData.backgroundImg})`
    }"
  >
    <div class="logo-box">
      <p class="logo">
        <transition name="module" mode="out-in">
          <i  key="date" :class='`iconfont icon-${currentData.icon}`'></i>
        </transition>
      </p>
    </div>
    <div class="title-box">
      <transition name="module" mode="out-in">
        <h5  key="category-11" class="title">
          <span>{{ currentData.text }}</span>
        </h5>
      </transition>
    </div>
  </div>
</template>

<script>
import { routerMap} from "~/config/app.config"
export default {
  name: "ArticleListHeader",
  computed: {

    // currentTag() {
    //   return this.$store.state.tag.data.find(
    //     tag => tag.slug === this.$route.params.tag_slug
    //   );
    // },
    // currentTagIconClass() {
    //   return this.getExtendsValue(this.currentTag, "icon") || "icon-tag";
    // },

    // currentCategoryIconClass() {
    //   return (
    //     this.getExtendsValue(this.currentCategory, "icon") || "icon-category"
    //   );
    // },
    // currentBackgroundImage() {
    //   const tagBg = this.getExtendsValue(this.currentTag, "background");
    //   const cateBg = this.getExtendsValue(this.currentCategory, "background");
    //   return tagBg || cateBg || getFileCDNUrl("/images/service.jpg");
    // },
    // currentBackgroundColor() {
    //   const tagBg = this.getExtendsValue(this.currentTag, "bgcolor");
    //   const cateBg = this.getExtendsValue(this.currentCategory, "bgcolor");
    //   return tagBg || cateBg || null;
    // },
    // currentDate() {
    //   return this.$route.params.date;
    // },
    currentData() {
      return routerMap[this.$route.params.category_slug];
    },
    // isMobile() {
    //   return this.$store.state.global.isMobile;
    // }
  },
  mounted(){
    console.log(routerMap)
  }
  // methods: {
  //   getExtendsValue(target, key) {
  //     if (!target || !target.extends.length) {
  //       return null;
  //     }
  //     const targetExtend = target.extends.find(t => t.name === key);
  //     return targetExtend ? targetExtend.value : null;
  //   }
  // }
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
