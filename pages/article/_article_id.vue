<template>
  <article class="article-page" :class="{ mobile: isMobile }">
    <div ref="detail" class="detail">
      <transition name="module" mode="out-in">
        <div v-if="!isFetching" class="oirigin" :class="originClass">
          <span>{{originText }}</span>
        </div>
      </transition>
      <div v-if="isFetching" key="skeleton" class="skeleton">
        <client-only>
          <skeleton-line class="title" />
          <skeleton-paragraph class="content" :lines="9" line-height="1.2em" />
        </client-only>
      </div>
      <div v-show="!isFetching" key="knowledge" class="knowledge">
        <template v-if="isPrivacy">
          <h2 class="title">{{ article.title }}</h2>
          <div id="article-content" key="article-content" class="content" v-html="articleContent"></div>
        </template>
        <template v-else>
          <div class="inputBox">
            <h2>查看此文章需要输入密码</h2>
            <input type="password" v-model="authPwd" placeholder="请输入密码">
            <div id="btn"  @click="savAauthPwd">确定</div>
            <!-- <button @click="savAauthPwd">确定</button> -->
          </div>
        </template>
      </div>
    </div>
    <div class="share">
      <transition name="module" mode="out-in">
        <div v-if="isFetching" key="skeleton" class="skeleton">
          <skeleton-base
            v-for="item in (isMobile ? 3 : 10)"
            :key="item"
            :style="{
              width: `calc((100% - (1em * ${isMobile ? 2 : 9})) / ${isMobile ? 3 : 10})`
            }"
            :radius="0"
          />
        </div>
        <share-box v-else key="share" :class="{ mobile: isMobile }" />
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <template v-if="isPrivacy">
        <div v-if="isFetching" key="skeleton" class="metas">
          <skeleton-paragraph :align="true" :lines="4" line-height="1.2em" />
        </div>
        <div v-else key="metas" class="metas">
          <p class="item">
            <span>{{$i18n.metas.text1.value}}</span>
            <span>&nbsp;</span>
            <nuxt-link :title="article.date" :to="article.date">
              <span>{{article.date }}</span>
            </nuxt-link>
            <span>&nbsp;{{$i18n.metas.text2.value}}&nbsp;</span>

            <nuxt-link :to="`/category/${article.category}`" :title="article.category">
              <span>{{$i18n.nav[article.category].value }}</span>
            </nuxt-link>
            <span>&nbsp;{{$i18n.metas.text3.value}}&nbsp;</span>
            <span>{{ article.view_num || 0 }}</span>
            <span>&nbsp;{{$i18n.metas.text4.value}}</span>
          </p>
          <p class="item">
            <span>{{ $i18n.metas.rlttag.value+": "}}</span>
            <nuxt-link
              v-for="tag in article.tags"
              :key="tag"
              :to="`/tag/${tag}`"
              :title="tag.description || tag.name"
            >
              <span class="title">&nbsp;&nbsp;&nbsp;{{tag}}&nbsp;</span>
            </nuxt-link>
          </p>
          <p class="item">
            <span class="title">{{ $i18n.metas.address.value+": " }}&nbsp;</span>
            <span class="site-url">{{ articleUrl }}</span>
          </p>
          <div class="item">
            <span class="title">{{ $i18n.metas.copyright.value+'：' }}</span>
            <span>
              <span>{{$i18n.metas.copyright1.value}}</span>
            </span>
          </div>
        </div>
      </template>
    </transition>
    <transition name="module" mode="out-in">
      <div v-if="isFetching" key="skeleton" class="related">
        <skeleton-paragraph v-if="isMobile" class="skeleton" :lines="4" line-height="1em" />
        <ul v-else class="skeleton-list">
          <skeleton-base v-for="item in 4" :key="item" class="article" />
        </ul>
      </div>
      <div v-else-if="article.related && article.related.length" key="related" class="related">
        <div v-if="!isMobile" v-swiper:releted="swiperOption" class="article-list swiper">
          <div class="swiper-wrapper">
            <div
              v-for="article in relatedArticles"
              :key="article.article_id"
              class="swiper-slide item"
            >
              <nuxt-link
                class="item-box filter"
                :to="`/article/${article.article_id}`"
                :title="'article.title'"
              >
                <img :src="apisMap.WEBSITE+article.imgUrl" :alt="''" class="thumb" @error="hiddenImg" />
                <span class="title">
                  <span class="text">{{ article.title }}</span>
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <ul v-else class="article-list">
          <div>推荐</div>
          <li v-for="(article, index) in relatedArticles" :key="index" class="item">
            <nuxt-link
              class="item-link"
              :to="`/article/${article.article_id}`"
              :title="`「 ${article.title} 」- 阅读`"
            >
              <span class="sign">《</span>
              <span class="title">{{ article.title }}</span>
              <span class="sign">》</span>
              <small class="tip">- 阅读</small>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
    <div v-if="isPrivacy" class="comment">
      <comment-box
        :fetching="isFetching"
        :post-id="routeArticleId"
        :likes="article && article.likes"
      />
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
import { OriginState } from "~/constants/system";
import {setCookie} from "~/utils/cookie"
import lozad from "~/plugins/lozad";
import marked from "~/plugins/marked";
import ShareBox from "~/components/widget/share";
import apisMap from "~/config/api.config";

export default {
  name: "ArticleDetail",
  components: {
    ShareBox
  },
  validate({ params, store }) {
    return params.article_id && !isNaN(Number(params.article_id));
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store
        .dispatch("article/fetchDetail", params)
        .then(res => {
          if (res.status === 404) {
            error({ statusCode: 404 });
          }
        })
        .catch(err => error({ statusCode: 500 })),
      store.dispatch("comment/fetchList", { post_id: params.article_id }),
      store.dispatch("article/showsDelay")
    ]);
  },

  head() {
    return {
      title: this.article?.title || "..."
    };
  },
  data() {
    return {
      authPwd:"",
      swiperOption: {
        setWrapperSize: true,
        simulateTouch: false,
        mousewheel: {
          sensitivity: 1
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        observeParents: true,
        grabCursor: true,
        slidesPerView: "auto"
      },
      isReadMoreLoading: false
    };
  },
  created(){
    this.apisMap=apisMap
  },
  mounted() {
    if (process.browser && this.isPrivacy) {
      this.observeLozad("article-content");
    }
  },
  watch: {
    $route(newVel, oldVel) {
      this.observeLozad("article-content");
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tag.data,
      article: state => state.article.detail.data,
      isFetching: state => state.article.detail.fetching,
      isPrivacy:state => state.article.detail.isPrivacy,
      isMobile: state => state.global.isMobile
    }),

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
    },

    articleContent() {
      const { content } = this.article;
      if (!content) {
        return "";
      }
      return marked(content, true);
    },
    routeArticleId() {
      return Number(this.$route.params.article_id);
    },
    articleUrl() {
      return apisMap.WEBSITE + `/article/${this.article.article_id}`;
    },

    relatedArticles() {
      return this.article.related;
    }
  },

  methods: {
    observeLozad(elementId) {
      const contentElement = this.$refs.detail.querySelector(`#${elementId}`);
      const lozadElements =
        contentElement && contentElement.querySelectorAll(".lozad");
      if (!lozadElements || !lozadElements.length) {
        return false;
      }
      const lozadObserver = lozad(lozadElements, {
        loaded: element => element.classList.add("loaded")
      });
      lozadObserver.observe();
    },
    hiddenImg(e) {
      e.target.parentNode.removeChild(e.target);
      // e.target.style.display="none"
    },
    savAauthPwd(){
      setCookie("authPwd",this.authPwd,60*60*24)
      location.reload();
    }
  }
};
</script>

<style lang="scss">
// workaround css scoped
.inputBox{
  width: 450px;
  margin: 0 auto;
}
.inputBox h2{
  font-size:28px;
  color: #333;
  margin-bottom: 10px;;
}

.inputBox input{
  position: relative;
  width:100% ;
  height: 60px;
  border: none;
  margin: 15px 0 20px;
  background: transparent;
  outline: none;
  padding: 0 20px;
  font-size: 24px;
  letter-spacing: 4px;
  box-sizing: border-box;
  border-radius: 8px;
  color:#333;
  box-shadow: -4px -4px 10px rgba(255,255,255,1),
              inset 4px 4px 10px rgba(0,0,0,0.05),
              inset -4px -4px 10px rgba(255,255,255,1),
              4px 4px 10px rgba(0,0,0,0.05);
}

.inputBox input::-webkit-input-placeholder{
  letter-spacing: 0px;
  font-size: 20px;
}

.inputBox #btn{
  position: relative;
  cursor: pointer;
  color: #fff;
  background: #333;
  font-size: 20px;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 8px ;
  user-select: none;
}

.inputBox #btn:active{
background: #9c27b0;
user-select: none;
}

.article-page {
  .share-box {
    .share-ejector {
      background-color: $body-bg;
    }
  }
}
</style>

<style lang="scss">
.article-page {
  &.mobile {
    > .detail,
    > .mammon,
    > .share,
    > .metas,
    > .related {
      margin-bottom: $gap;
    }

    > .detail {
      padding: $gap $lg-gap;

      > .oirigin {
        font-size: $font-size-base;
      }

      > .knowledge {
        > .content {
          pre {
            padding-left: 0;

            > .code-lines {
              display: none;
            }
          }
        }
      }
    }

    > .metas {
      line-height: 2.3em;

      > .item {
        margin: 0;
        padding: 0;
        border: none;

        > .title.en {
          width: auto;
          margin-right: $gap;
        }
      }
    }

    > .related {
      height: auto;

      > .article-list {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: 0.9;

        > .item {
          > .item-link {
            display: flex;
            width: 100%;
            height: 2.2em;
            line-height: 2.2em;

            > .title {
              max-width: 70%;
              display: inline-block;
              @include text-overflow();
            }
            > .tip {
              display: inline-block;
            }
          }
        }
      }
    }
  }

  > .detail,
  > .mammon,
  > .share,
  > .metas,
  > .related {
    margin-bottom: $lg-gap;
    background-color: $module-bg;
  }

  > .mammon {
    padding: $gap;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mammon-ins {
      width: 100%;
      height: 16rem;
      min-height: 16rem;
    }

    .skeleton {
      width: 100%;
    }
  }

  > .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    > .skeleton {
      .title {
        width: 60%;
        height: 26px;
        margin: 2rem auto;
      }

      .content {
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
    }

    > .oirigin {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      width: 7rem;
      height: 4rem;
      line-height: 5.8rem;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: $text-reversal;
      font-weight: bold;
      font-size: $font-size-small;

      &.self {
        background-color: rgba($accent, 0.8);
      }

      &.other {
        background-color: rgba($red, 0.8);
      }

      &.hybrid {
        background-color: rgba($yellow, 0.8);
      }
    }

    > .knowledge {
      > .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * 0.95;
      }

      > .content {
        > .google-auto-placed {
          margin-bottom: $sm-gap;
        }

        iframe {
          width: 100%;
          margin-bottom: 1em;
          background-color: $theme-black;
        }

        a {
          font-weight: bold;
          margin: 0 0.1em;

          &.image-link {
            margin: 0;
          }

          &:hover {
            text-decoration: underline;
          }
        }

        img {
          max-width: 100%;
          position: relative;
          margin: 0 auto;
          display: block;
          text-align: center;
          border-radius: $radius;
          border: $sm-gap solid $module-hover-bg;
          opacity: 0.9;
          cursor: pointer;

          &:hover {
            opacity: 1;
            transition: all $transition-time-normal;
          }
        }

        p {
          line-height: 2.2em;
          text-indent: 2em;
          margin-bottom: 1em;

          &.text-center {
            text-align: center;
          }

          &.text-right {
            text-align: right;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }

        blockquote {
          p {
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        ul {
          list-style-type: square;
        }

        ul,
        ol {
          > li {
            line-height: 1.8em;
            padding: 0.5em 0.8em;

            &:hover {
              background-color: $module-hover-bg;
            }

            > p {
              text-indent: 0;
            }

            > ul {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        code {
          color: #bd4147;
          padding: 0.3em 0.5em;
          margin: 0 0.5em;
          border-radius: $radius;
          background-color: $module-hover-bg;
        }

        pre {
          $code-header-height: 2.8rem;
          $code-number-width: 3rem;
          $code-row-line-height: 1.8rem;
          $code-font-size: $font-size-h6;
          display: block;
          position: relative;
          overflow: hidden;
          margin-bottom: 1em;
          padding-left: $code-number-width;
          font-size: $code-font-size;
          background-color: rgba($black, 0.8);

          &:before {
            color: $white;
            content: attr(data-lang) " CODE";
            height: $code-header-height;
            line-height: $code-header-height;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgba(68, 68, 68, 0.9);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }

          > .code-lines {
            position: absolute;
            left: 0;
            top: $code-header-height;
            margin: 0;
            padding: 1rem 0;
            width: $code-number-width;
            height: calc(100% - #{$code-header-height});
            text-align: center;
            background-color: rgba($black, 0.2);

            > .code-line-number {
              padding: 0;
              position: relative;
              list-style-type: none;
              line-height: $code-row-line-height;
              font-size: $font-size-small;
              user-select: none;
              transition: none;

              &:hover {
                &:before {
                  @include visible();
                }
              }

              &:before {
                content: "";
                position: absolute;
                top: 0;
                left: $code-number-width;
                width: 66em;
                height: 100%;
                background-color: rgba(154, 154, 154, 0.2);
                @include hidden();
              }
            }
          }

          > code {
            margin: 0;
            padding: 1rem;
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: $code-row-line-height;
            color: rgba($white, 0.87);
            background-color: transparent;
          }
        }
      }

      @keyframes readmorebtn {
        0% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
        25% {
          transform: translate3d(0, $sm-gap, 0);
          background-color: $primary;
          color: $white;
        }
        50% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
        75% {
          transform: translate3d(0, $sm-gap, 0);
          background-color: $primary;
          color: $white;
        }
        100% {
          transform: translate3d(0, 0, 0);
          background-color: $module-hover-bg;
        }
      }

      > .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: $gap;

        > .readmore-btn {
          width: 80%;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
          background-color: $module-hover-bg;
          animation: readmorebtn 4s linear infinite;

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary !important;
            color: $white !important;
          }

          > .iconfont {
            margin-left: $sm-gap;
          }
        }
      }
    }
  }

  > .share {
    padding: $gap;

    > .skeleton {
      display: flex;
      justify-content: space-between;
      height: 3rem;
    }

    > .share-box {
      width: 100%;
      opacity: 0.6;
      display: flex;
      justify-content: space-between;

      &:hover {
        opacity: 1;
      }

      > .share-ejector {
        flex-grow: 1;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        margin-right: $gap;
        font-size: 17px;

        &:last-child {
          margin-right: 0;
        }
      }

      &.mobile {
        > .share-ejector {
          width: auto;
          display: none;
          flex-grow: 0;

          &[class*="wechat"],
          &[class*="weibo"],
          &[class*="twitter"] {
            display: inline-block;
            flex-grow: 1;
          }
          &[class*="twitter"] {
            margin-right: 0;
          }
        }
      }
    }
  }

  > .metas {
    padding: $gap;

    > .item {
      margin-bottom: $lg-gap;
      border-left: solid $sm-gap $body-bg;
      padding-left: $gap;
      word-break: break-all;

      &:last-child {
        margin: 0;
      }

      a:hover {
        text-decoration: underline;
      }

      > .title.en {
        width: 11rem;
        display: inline-block;
      }

      .site-url {
        text-decoration: underline;
        cursor: pointer;
        color: $link-color;

        &:hover {
          color: $link-hover-color;
        }
      }
    }
  }

  > .related {
    padding: $gap 0;
    border-width: 0 $gap;
    border-color: transparent;
    overflow: hidden;
    user-select: none;

    > .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    > .swiper.article-list {
      > .swiper-wrapper {
        height: 9rem;
        overflow: hidden;

        > .swiper-slide.item {
          width: auto;
          margin-right: $gap;

          &:last-child {
            margin-right: 0;
          }

          > .item-box {
            display: block;
            position: relative;
            overflow: hidden;
            width: auto;
            height: 100%;
            opacity: 0.8;

            &:hover {
              .thumb {
                opacity: 1;
                transform: scale(1.1);
              }

              > .title {
                opacity: 1;
              }
            }

            > .thumb {
              width: 200px;
              height: 100%;
              transform: scale(1);
              transition: transform $transition-time-normal,
                opacity $transition-time-fast;
            }

            > .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2em;
              line-height: 2em;
              background-color: $module-hover-bg-darken-10;
              opacity: 0.4;
              color: $text-reversal;
              font-size: $font-size-h6;
              transition: opacity $transition-time-fast;

              .text {
                display: block;
                padding: 0 0.5em;
                text-align: center;
                @include text-overflow();
              }
            }
          }
        }
      }
    }
  }
}
</style>
