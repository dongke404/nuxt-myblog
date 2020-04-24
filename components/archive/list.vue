<template>
  <div class="articles">
    <!-- 非首页列表头 -->
    <div v-if="!isIndexRoute" class="article-list-header">
      <list-header />
    </div>
    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <transition-group
          v-if="article.data.data && article.data.data.length"
          key="list"
          name="fade"
          tag="div"
        >
          <list-item
            v-for="(articleItem,index) in article.data.data"
            :key="index"
            :article="articleItem"
            @click.native="toDetail(articleItem)"
          />
        </transition-group>
      </transition>
    </div>
    <!-- 加载更多 -->
    <div class="article-load">
      <button
        class="loadmore-button"
        :disabled="article.fetching || !isCanLoadMore"
        @click="$emit('loadmore')"
      >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <div class="text">
          <span v-if="!article.fetching && isCanLoadMore">{{ $i18n.text.article.loadmore.value }}</span>
          <span v-else-if="article.fetching && isCanLoadMore">{{ $i18n.text.article.loading.value }}</span>
          <span v-else-if="!isCanLoadMore">{{ $i18n.text.article.nomore.value }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ListItem from "./item.vue";
import ListHeader from "./header.vue";
import { isIndexRoute } from "~/utils/route-validator";

export default {
  name: "ArticleList",
  components: {
    ListItem,
    ListHeader
  },
  props: {
    article: {
      type: Object
    }
  },
  computed: {
    // isMobile() {
    //   return this.$store.state.global.isMobile;
    // },
    isCanLoadMore() {
      const { current_page, total_page } = this.article.data.pagination;
      const hasArticles = this.article.data.pagination;
      return hasArticles ? current_page < total_page : false;
    },
    isIndexRoute() {
      return isIndexRoute(this.$route.name);
    }
    // btnColorBlockLeft() {
    //   return this.isMobile ? 60 : 75;
    // }
  },
  methods: {
    toDetail(article) {
      if (this.isMobile) {
        this.$router.push(`/article/${article.id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.articles {
  &.mobile {
    > .article-list,
    > .article-list-mammon,
    > .article-list-header {
      margin-bottom: $gap;
    }

    > .article-list-mammon {
      padding: $gap;

      &::v-deep .mammon-ins {
        margin: 0;
        height: 81px;
      }
    }
  }

  > .article-list-header {
    margin-bottom: $lg-gap;
    position: relative;
    overflow: hidden;
  }

  > .article-list-mammon {
    padding: $sm-gap;
    margin-bottom: $lg-gap;
    background-color: $module-bg;

    &::v-deep .mammon-ins {
      margin: $sm-gap 0;
      height: 100px;
    }
  }

  > .article-list {
    margin-bottom: $lg-gap;
    min-height: $lg-gap;
    overflow: hidden;

    > .article-empty-box {
      color: $text-disabled;
      @include module-blur-bg();
    }

    > .article-loading {
      display: flex;
      height: $gap * 10;
      @include module-blur-bg();
    }

    > .article-errmsg {
      height: $gap * 10;
      line-height: $gap * 10;
      text-align: center;
      color: rgba(0, 0, 0, 0.38);
      @include module-blur-bg();
    }
  }

  > .article-load {
    overflow: hidden;
    z-index: $z-index-normal;

    > .loadmore-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: $block-button-height;
      line-height: $block-button-height;
      padding-left: $gap * 2;
      color: $text-reversal;
      background-color: $module-bg;
      @include background-transition();

      &[disabled] {
        opacity: 0.6;
      }

      .iconfont {
        color: $text;
        @include color-transition();
      }

      &:hover {
        background-color: $module-hover-bg;

        .iconfont {
          color: rgba($red, 0.6);
        }
      }

      > .text {
        position: relative;
        height: $block-button-height;
        padding: 0 ($gap * 2) 0 ($gap * 3);
        font-family: "webfont-bolder", DINRegular;
        text-transform: uppercase;
        background: rgba($red, 0.6);

        &::before {
          $size: 1rem;
          content: "";
          display: block;
          position: absolute;
          width: $size;
          height: 200%;
          top: -50%;
          left: -($size / 2);
          background: $body-bg;
          transform: rotate(18deg);
        }
      }
    }
  }
}
</style>
