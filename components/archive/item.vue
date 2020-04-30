<template>
  <div class="article-list-item" :class="{ mobile: isMobile }">
    <div class="item-content">
      <div v-if="!isMobile" class="item-thumb">
        <nuxt-link :to="`/article/${article.article_id}`">
          <span class="item-oirigin" :class="originClass">{{ originText }}</span>
          <img class="item-thumb-img" :src="article.imgUrl" />
        </nuxt-link>
      </div>
      <div class="item-body">
        <h5 class="item-title">
          <nuxt-link :to="`/article/${article.article_id}`" v-text="article.title" />
        </h5>
        <p
          class="item-description"
          style="-webkit-box-orient: vertical;"
          v-html="article.description"
        ></p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ article.date}}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-view"></i>
            <span>{{ article.view_num ||0 }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ article.cmt_num ||0 }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
            <span>{{ article.likes ||0}}</span>
          </span>
          <span v-if="!isMobile" class="categories">
            <i class="iconfont icon-category"></i>
            <nuxt-link :to="`/category/${article.category}`">
              <span>{{ i18nConfig.data.nav[article.category][language]}}</span>
            </nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import i18nConfig from "~/config/i18n.config";
import { getJSONStorageReader } from "~/utils/local-storage";
import { OriginState, StorageField } from "~/constants/system";
const localHistoryLikes = getJSONStorageReader(StorageField.UserLikeHistory);
export default {
  name: "ArticleListItem",
  props: {
    article: Object
  },
  data() {
    return {
      isLiked: false,
      i18nConfig: i18nConfig
    };
  },
  computed: {
    ...mapState("global", ["isMobile", "language"]),
    originText() {
      if (!this.article.origin) {
        return this.$i18n.text.origin.original.value;
      }
      if (this.article.origin === OriginState.Reprint) {
        return this.$i18n.text.origin.reprint.value;
      }
      if (this.article.origin === OriginState.Hybrid) {
        return this.$i18n.text.origin.hybrid.value;
      }
      return "-";
    },
    originClass() {
      if (!this.article.origin) {
        return "self";
      }
      if (this.article.origin === OriginState.Reprint) {
        return "other";
      }
      if (this.article.origin === OriginState.Hybrid) {
        return "hybrid";
      }
    }
  },
  mounted() {
    this.isLiked = localHistoryLikes
      .get()
      ?.pages.includes(this.article.article_id);
  }
};
</script>

<style lang="scss" scoped>
.article-list-item {
  margin-bottom: $lg-gap;
  @include module-blur-bg();
  @include background-transition();

  &:hover {
    background-color: $module-hover-bg;
  }

  &:last-child {
    margin: 0;
  }

  > .item-content {
    $height: $gap * 11;
    $padding: $sm-gap;
    $content-height: $height - ($padding * 2);
    display: block;
    overflow: hidden;
    height: $height;
    padding: $padding;

    &:hover {
      .item-thumb {
        .item-oirigin {
          opacity: 1;
        }

        .item-thumb-img {
          opacity: 0.95;
          transform: translateX(-3px);
        }
      }
    }

    > .item-thumb {
      float: left;
      width: 12em;
      height: $content-height;
      overflow: hidden;
      position: relative;

      .item-oirigin {
        position: absolute;
        left: 0;
        top: 0;
        height: 2.1rem;
        line-height: 2.1rem;
        z-index: $z-index-normal + 1;
        padding: 0 $sm-gap;
        border-bottom-right-radius: 1px;
        opacity: 0.4;
        font-size: $font-size-small;
        color: $text-reversal;
        text-align: center;
        text-transform: uppercase;
        @include visibility-transition();

        &.self {
          background-color: rgba($accent, 0.5);
        }

        &.other {
          background-color: rgba($red, 0.5);
        }

        &.hybrid {
          background-color: rgba($primary, 0.5);
        }
      }

      .item-thumb-img {
        min-width: 100%;
        width: calc(100% + 3px);
        max-width: calc(100% + 3px);
        height: auto;
        min-height: $content-height;
        border-color: transparent;
        background-color: $module-hover-bg;
        opacity: 1;
        transform: translateX(0);
        transition: transform $transition-time-fast,
          opacity $transition-time-fast;
      }
    }

    > .item-body {
      float: right;
      width: 28.5em;
      height: $content-height;

      > .item-title {
        margin-top: 3px;
        margin-bottom: $sm-gap;
        font-weight: bold;
        color: $link-hover-color;
        @include text-overflow();

        > a {
          margin-left: 0;
          transition: margin $transition-time-normal;

          &:hover {
            display: inline-block;
            text-decoration: underline;
            margin-left: $sm-gap;
          }
        }
      }

      > .item-description {
        height: 5rem;
        margin: 0;
        margin-bottom: $xs-gap;
        line-height: 1.8em;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: $font-size-h6;
        @include clamp(3);
      }

      > .item-meta {
        height: 2em;
        line-height: 2em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        overflow: hidden;
        font-size: $font-size-small;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: normal;

        > .date {
          text-transform: uppercase;
        }

        > .views {
          min-width: 4rem;
        }

        > .likes {
          > .liked {
            color: $red;
          }
        }

        > .likes,
        > .comments {
          min-width: 3em;
        }

        > .date,
        > .views,
        > .comments,
        > .likes,
        > .tags,
        > .categories {
          > .iconfont {
            margin-right: $xs-gap;
          }
        }

        > .tags,
        > .categories {
          a {
            text-transform: capitalize;
            margin-right: $sm-gap;
          }
        }

        > .tags {
          margin-right: 0;
        }
      }
    }
  }

  &.mobile {
    margin-bottom: $gap;

    &:last-child {
      margin: 0;
    }

    > .item-content {
      height: auto;
      padding: $sm-gap $gap;

      > .item-body {
        width: 100%;
        height: auto;

        > .item-description {
          height: auto;
          margin-bottom: 0.5em;
        }

        > .item-meta {
          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
