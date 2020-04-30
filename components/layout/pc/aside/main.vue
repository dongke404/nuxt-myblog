<template>
  <aside id="aside" class="aside">
    <!-- 搜索框 -->
    <div class="aside-search">
      <div class="search-box">
        <input
          id="keyword"
          v-model.trim="keyword"
          required
          list="keywords"
          type="search"
          name="search"
          class="search-input"
          :class="language"
          :placeholder="$i18n.text.search.value"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="iconfont icon-search" />
        </button>
      </div>
    </div>
    <!-- 热门文章 -->
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-hotfill" />
        <strong v-text="$i18n.text.article.hotlist.value" />
      </p>
      <empty-box v-if="!articles.length">
        <slot>{{ $i18n.text.article.empty.value }}</slot>
      </empty-box>
      <ul v-else class="aside-article-list">
        <li v-for="item in articles" :key="item.id" class="item">
          <span class="index" />
          <nuxt-link
            class="title"
            :to="`/article/${item.article_id}`"
            :title="`${item.title} - 「 ${item.cmt_num} ${$i18n.text.comment.count.value} | ${item.likes} ${$i18n.text.comment.like.value} 」`"
          >
            <span v-text="item.title" />
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- 广告栏 -->
    <!-- <client-only>
      <aside-ad
        ref="asideAd"
        @slide-change="handleSlideChange"
      />
    </client-only>-->
    <!-- 日历 -->
    <div class="aside-calendar">
      <calendar />
    </div>
    <!-- 广告栏 -->
    <!-- <transition name="module">
      <div key="ad" class="aside-mammon alimama">
        <iframe
          scrolling="no"
          frameborder="0"
          class="mammon-iframe"
          src="/partials/mammon/aside.html"
        />
      </div>
    </transition>-->
    <div class="aside-sticky-box">
      <!-- 广告栏 -->
      <!-- <client-only>
        <aside-ad
          v-if="renderStickyAd"
          :init-index="adIndex"
          @slide-change="handleChangeAdSwiper"
        />
      </client-only>-->
      <div class="aside-tag">
        <empty-box v-if="!tags.length">
          <slot>{{ $i18n.text.tag.empty.value }}</slot>
        </empty-box>
        <ul v-else class="aside-tag-list">
          <nuxt-link
            v-for="(tag, index) in tags"
            :key="index"
            class="item"
            :to="`/tag/${tag.name}`"
          >
            <a class="title" :title="tag.description">
              <i :class="`icon-${tag.icon}`" class="iconfont" />
              <span class="name">
                <span>{{ tag.name }}</span>
                <span>({{ tag.count || 0 }})</span>
              </span>
            </a>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Calendar from "./calendar";
import { Route } from "~/constants/system";

// polyfill sticky event
let stickyEvents = null;

export default Vue.extend({
  name: "PcAside",
  components: {
    // AsideAd,
    Calendar
  },
  data() {
    return {
      adIndex: 0,
      keyword: "",
      renderStickyAd: false
    };
  },
  mounted() {
    //将关键字设置为服务端进来的路由
    if (this.$route.name === Route.SearchArchive) {
      this.keyword = this.$route.params.keyword;
    }

  },

  computed: {
    ...mapState({
      tags: state => state.tag.data,
      articles: state => state.article.hotList.data.data,
      language: state => state.global.language
    })
  },
  methods: {
    handleSearch() {
      const keyword = this.keyword;
      const paramsKeyword = this.$route.params.keyword;
      const isSearchPage = this.$route.name === Route.SearchArchive;
      //相同关键字则不再搜索
      if (keyword && (isSearchPage ? paramsKeyword !== keyword : true)) {
        this.$router.push({ name: Route.SearchArchive, params: { keyword } });
      }
    }

  }
});
</script>

<style lang="scss" scoped>
#aside {
  display: block;
  width: $aside-width;
  margin: 0;
  margin-left: $lg-gap;
  user-select: none;

  .aside-search,
  .aside-article,
  .aside-calendar,
  .aside-mammon,
  .aside-tag {
    margin-bottom: $lg-gap;
    @include module-blur-bg();
  }

  .aside-search {
    padding: $sm-gap;
    width: 100%;
    height: 3em;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .search-input,
    .search-btn,
    .sitemap-btn {
      height: 2em;
      line-height: 2em;
      background-color: $module-hover-bg;
      @include background-transition();

      &:hover {
        background-color: $module-hover-bg-darken-20;
      }
    }

    > .search-box {
      display: flex;
      flex-grow: 1;

      > .search-input {
        margin-right: 0;
        flex-grow: 1;

        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }

      > .search-btn {
        width: 2em;
        background-color: $module-hover-bg-darken-20;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg-darken-40;
        }
      }
    }

    > .sitemap-btn {
      display: inline-block;
      text-align: center;
      margin-left: $sm-gap;
      width: 3em;

      > .iconfont {
        font-size: $font-size-h3;
      }
    }
  }

  > .aside-article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dashed $body-bg;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    > .aside-article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: block;
        height: 1.9em;
        line-height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-dark;
        @include text-overflow();

        &:nth-child(1) {
          .index {
            color: $text-reversal;
            background-color: $primary-opacity-5;
          }
        }

        &:nth-child(2) {
          .index {
            color: $text-reversal;
            background-color: rgba($accent, 0.6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $text-reversal;
            background-color: rgba($red, 0.6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          color: $text-secondary;
          counter-increment: hot-article-list;
          background-color: $module-hover-bg;
          width: 1.5em;
          height: 1.5em;
          line-height: 1.5em;
          display: inline-block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          font-size: $font-size-h6;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .aside-calendar {
    padding: $gap;
  }

  .aside-mammon {
    width: 100%;

    &.alimama {
      height: $aside-width;
      display: flex;
      justify-content: center;
      align-items: center;

      > .mammon-iframe {
        height: 250px;
        width: 250px;
        overflow: hidden;
      }
    }
  }

  .aside-sticky-box {
    $top-height: $header-height + $lg-gap;
    $tool-height: 3rem;
    position: sticky;
    top: $top-height;
    width: $aside-width;

    > .aside-tag {
      margin-bottom: 0;
      max-height: calc(
        100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height}
      );
      overflow-y: auto;
    }

    > .aside-tag {
      width: 100%;
      padding-left: $gap;
      border-top: $gap solid transparent;
      border-bottom: $gap solid transparent;

      .empty-box {
        padding-right: $gap;
        padding-bottom: $gap;
      }

      .aside-tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;

        .item {
          display: inline-flex;
          margin-right: $sm-gap;
          margin-bottom: $gap;
          height: 2em;
          line-height: 2em;
          font-size: $font-size-h6;
          text-transform: capitalize;

          &:last-child {
            margin: 0;
          }

          &:hover {
            .title {
              .iconfont {
                background-color: $module-hover-bg;
              }

              .name {
                background-color: $module-hover-bg-darken-20;
              }
            }
          }

          .title {
            display: flex;
            font-family: $font-family-sans-serif;

            .iconfont {
              width: 2em;
              text-align: center;
              background-color: $module-hover-bg-opacity-3;
              @include background-transition();
            }

            .name {
              display: block;
              padding: 0 $sm-gap;
              background-color: $module-hover-bg;
              @include background-transition();
            }
          }
        }
      }
    }
  }
}
</style>
