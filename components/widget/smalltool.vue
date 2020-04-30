<template>
  <div id="toolbox">
    <div class="container">
      <div class="tools">
        <button
          v-if="isArticlePage"
          class="to-page-top"
          :title="$i18n.text.article.fullcolread.value"
          @click="handleSetFullColumn"
        >
          <i class="iconfont icon-fullcolumn" />
        </button>
        <button class="to-page-top" :title="$i18n.text.totop.value" @click="totop">
          <i class="iconfont icon-totop" />
        </button>
        <button class="to-page-bottom" :title="$i18n.text.tobottom.value" @click="toBottom">
          <i class="iconfont icon-tobottom" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Route } from "~/constants/system";
export default {
  name: "SmallTool",
  computed: {
    isArticlePage() {
      return this.$route.name === Route.ArticleDetail;
    },
    isThreeColumns() {
      return this.$store.state.global.isThreeColumns;
    }
  },
  methods: {
    totop() {
      scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    toBottom() {
      scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    },
    handleSetFullColumn() {
      if (this.isThreeColumns) {
        this.$store.commit("global/updateThreeColumnsState", false);
      } else {
        this.$store.commit("global/updateThreeColumnsState", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#toolbox {
  position: fixed;
  z-index: $z-index-toolbox;
  width: 100%;
  bottom: 20rem;

  > .container {
    $size: $lg-gap * 2.8;
    position: relative;

    > .tools {
      position: absolute;
      right: -12rem;
      width: $size;

      > .to-page-top,
      > .to-page-bottom {
        display: block;
        width: $size;
        height: $size;
        line-height: $size;
        text-align: center;
        @include module-blur-bg();
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;
        }
      }

      > .to-page-bottom {
        height: $size * 0.8;
        line-height: $size * 0.8;
      }
    }
  }
}
</style>

