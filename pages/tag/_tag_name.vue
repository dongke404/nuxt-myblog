<template>
  <div class="tag-archive-page">
    <article-list :article="article" @loadmore="loadmoreArticle" />
  </div>
</template>

<script>
import ArticleList from "~/components/archive/list";

export default {
  name: "TagArticleList",
  components: {
    ArticleList
  },
  validate({ params, store }) {
    return (
      params.tag_name &&
      store.state.tag.data.some(tag => tag.name === params.tag_name)
    );
  },
  fetch({ store, params }) {
    return store.dispatch("article/fetchList", params);
  },
  head() {
    const name = this.defaultParams.tag_name || "";
    const title = name
      .toLowerCase()
      .replace(/( |^)[a-z]/g, L => L.toUpperCase());
    return { title: `${title} | Tag` };
  },
  created() {
    if (!this.currentTag) {
      this.$router.back();
    }
  },
  computed: {
    article() {
      return this.$store.state.article.list;
    },
    currentTag() {
      return this.$store.state.tag.data.find(
        tag => tag.name === this.$route.params.tag_name
      );
    },
    defaultParams() {
      return {
        tag_name: this.$route.params.tag_name
      };
    },
    nextPageParams() {
      return {
        page: this.article.data.pagination.current_page + 1,
        ...this.defaultParams
      };
    }
  },
  methods: {
    loadmoreArticle() {
      this.$store.dispatch("article/fetchList", this.nextPageParams);
    }
  }
};
</script>
