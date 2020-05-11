<template>
  <div class="imgbox">
    <client-only>
      <vue-waterfall-easy
        v-if="photos.length"
        ref="waterfall"
        :imgsArr="photos"
        :maxCols=5
        @scrollReachBottom="getData"
      >
        <div slot="waterfall-over">已经没有了</div>
      </vue-waterfall-easy>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "Album",
  props: {
    photos: {
      type: Array
    }
  },
  methods: {
    getData() {
      this.$emit("updateData");
    },
    loadover() {
      this.$refs.waterfall.waterfallOver();
    }
  },

};
</script>

<style lang="scss" scoped>
.imgbox {
  width: 100%;
  height: 100vh;
}
</style>
