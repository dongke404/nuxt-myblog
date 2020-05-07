<template>
  <div class="category-archive-page">
    <article-list :article="article" @loadmore="loadmoreArticles" />
  </div>
</template>

<script>
import ArticleList from "~/components/archive/list";

export default {
  name: "CategoryArticleList",
  components: {
    ArticleList
  },
  fetch({ store, params }) {
    return store.dispatch("article/fetchList", params);
  },
  head() {
    const slug = this.defaultParams.category_slug || "";
    const title = slug
      .toLowerCase()
      .replace(/( |^)[a-z]/g, L => L.toUpperCase());
    const zhTitle = `${this.$i18n.nav[slug].value} | `;
    return {
      title: `${zhTitle}${title} | Category`
    };
  },
  computed: {
    article() {
      return this.$store.state.article.list;
    },

    defaultParams() {
      return {
        category_slug: this.$route.params.category_slug
      };
    },
    nextPageParams() {
      return Object.assign(
        {
          page: this.article.data.pagination.current_page + 1
        },
        this.defaultParams
      );
    }
  },
  methods: {
    loadmoreArticles() {
      this.$store.dispatch("article/fetchList", this.nextPageParams);
    }
  }
};
</script>

