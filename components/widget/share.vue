<template>
  <div class="share-box">
    <a
      v-for="(social, index) in socials"
      :key="index"
      rel="nofollow noopener"
      class="share-ejector"
      :title="'Share to: ' + social.name"
      :class="social.class || social.name"
      @click.prevent="shareWindow(social.name, social.url)"
    >
      <i class="iconfont" :class="`icon-${social.icon || social.class || social.name}`"></i>
    </a>
    <span class="share-ejector link" @click="copyPageUrl">
      <i class="iconfont icon-lianjie"></i>
    </span>
  </div>
</template>

<script>
import { meta } from "~/config/app.config";
import systemConstants from "~/constants/system";
import apiConfig from "~/config/api.config";

export default {
  name: "Share",
  data() {
    return {
      socials: [
        {
          name: "微信",
          class: "wechat",
          url: () => `http://qr.liantu.com/api.php?text=${this.url}`
        },
        {
          name: "微博",
          class: "weibo",
          url: () =>
            `https://service.weibo.com/share/share.php?url=${
              this.url
            }&title=${this.title()}&source=${this.url}&sourceUrl=${
              this.url
            }&content=${this.description()}`
        },
        {
          name: "twitter",
          class: "twitter",
          url: () =>
            `https://twitter.com/share?text=${this.title()}&url=${this.url}`
        },
        {
          name: "QQ空间",
          class: "qzone",
          url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
              this.url
            }&title=${this.title()}&summary=${this.description()}&site=${
              this.url
            }`
        },
        {
          name: "豆瓣",
          class: "douban",
          url: () =>
            `https://www.douban.com/recommend/?url=${
              this.url
            }&title=${this.title()}`
        },
        {
          name: "facebook",
          class: "facebook",
          url: () => `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
        },
        {
          name: "linkedin",
          class: "linkedin",
          url: () =>
            `https://www.linkedin.com/shareArticle?title=${this.title()}&summary=${this.description()}&mini=true&url=${
              this.url
            }`
        }
      ]
    };
  },
  computed: {
    url() {
      return apiConfig.WEBSITE + this.$route.fullPath;
    }
  },
  methods: {
    copyPageUrl() {
      this.$root.$copyToClipboard(this.url);
    },
    //获取单页面head设置的数据 详见nuxt head配置
    description() {
      try {
        if (document) {
          return document
            .getElementsByName("description")[0]
            .getAttribute("content");
        }
      } catch (error) {
        return "";
      }
    },
    title() {
      try {
        if (document) {
          return document.title;
        }
      } catch (error) {
        return meta.title;
      }
    },
    shareWindow(social, url) {
      const targetUrl = url().replace(/\s|\||dongkirk.xyz/g, "");
      /*
       * screen.availWidth 获得屏幕宽度
       * screen.availHeight 获得屏幕高度
       * 居中的算法是：
       * 左右居中： (屏幕宽度 - 窗口宽度)/2
       * 上下居中： (屏幕高度 - 窗口高度)/2
       *
       */
      // 给打开的窗口命名
      const windowName = `分享 ${meta.title}`;
      // 窗口宽度,需要设置
      const awidth = (screen.availWidth / 6) * 2;
      // 窗口高度,需要设置
      const aheight = (screen.availHeight / 5) * 2;
      // 窗口顶部位置,一般不需要改
      const atop = (screen.availHeight - aheight) / 2;
      // 窗口放中央,一般不需要改
      const aleft = (screen.availWidth - awidth) / 2;
      // 新窗口的参数
      const baseParam =
        "scrollbars=0,status=0,menubar=0,resizable=2,location=0";
      // 新窗口的左部位置，顶部位置，宽度，高度
      const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${baseParam}`;
      // 打开新窗口
      const _window = window.open(targetUrl, windowName, params);
      // 新窗口获得焦点
      _window.focus();
    }
  }
};
</script>

<style lang="scss">
.share-box {
  @include visibility-transition();

  > .share-ejector {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    @include background-transition();

    &.wechat:hover {
      background-color: rgb(123, 179, 46);
    }

    &.weibo:hover {
      background-color: rgb(230, 22, 45);
    }

    &.qzone:hover {
      background-color: rgb(43, 130, 217);
    }

    &.douban:hover {
      background-color: rgb(0, 119, 17);
    }

    &.renren:hover {
      background-color: rgb(0, 94, 172);
    }



    &.twitter:hover {
      background-color: rgb(85, 172, 238);
    }

    &.facebook:hover {
      background-color: rgb(59, 89, 152);
    }

    &.linkedin:hover {
      background-color: rgb(0, 123, 181);
    }

    &.link:hover {
      background-color: #e67a1c;
    }

    &:hover {
      > .iconfont {
        color: $white;
      }
    }

    > .iconfont {
      display: block;
    }
  }
}
</style>
