<template>
  <div class="timeline" :class="{ mobile: isMobile }">
    <client-only>
      <timeline>
        <div v-for="(item,index) in datalist" :key="index">
          <div v-for="(item1,index) in item.data" :key="index">
            <timeline-item v-if="item1.say" bg-color="#9dd8e0">
              <h4>{{formateDate(item1.date)}}</h4>
              {{item1.say}}
            </timeline-item>
            <timeline-item v-else :hollow="true">
              <h4>{{formateDate(item1.date)}}</h4>
              <nuxt-link :to="`/article/${item1.article_id}`">
                <h4>
                  <i class="iconfont icon-article"></i>
                  {{ item1.title }}
                  &nbsp;&nbsp;
                  <i
                    v-if=" !isMobile"
                  >{{ item1.description }}</i>
                </h4>
              </nuxt-link>
            </timeline-item>
          </div>
          <timeline-title bg-color="#8e44ad">
            <h2>{{item.year}}</h2>
          </timeline-title>
        </div>
      </timeline>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  head() {
    return {
      title: this.$i18n.nav.timeline.value
    };
  },
  fetch({ store }) {
    return store.dispatch("timeline/fetchList");
  },
  computed: {
    datalist() {
      return this.$store.state.timeline.data;
    },
    isMobile() {
      return this.$store.state.global.isMobile;
    }
  },
  methods: {
    formateDate(time) {
      if (!time) return "";
      let date = new Date(time);
      return date.getMonth() + 1 + "/" + date.getDate();
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline {
  margin-left: 50px;
  &.mobile {
    margin-left: 0px;
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    padding: 0;
  }
  i {
    font-size: 10px;
  }
}
</style>
