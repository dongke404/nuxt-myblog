<template>
  <div id="language">
    <div class="ricon-boxs" :class="language">
      <div
        v-for="(item,index) in languages"
        :key="index"
        class="ricon-box"
        :style="{display:isshow}"
      >
        <i @click="changelanguage" :title="item">{{item}}</i>
      </div>
    </div>
    <div class="ricon-current" :class="language" @click="showlanguage">{{language}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import systemConstants from "~/constants/system";
import { getStorageReader } from "~/utils/local-storage";

export default Vue.extend({
  name: "Language",
  data() {
    return {
      isshow: "none"
    };
  },
  computed: {
    language() {
      return this.$store.state.global.language;
    },
    languages() {
      let languages = [];
      let obj = systemConstants.Language;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          languages.push(element);
        }
      }
      return languages;
    }
  },
  methods: {
    showlanguage() {
      if (this.isshow === "block") {
        this.isshow = "none";
      } else {
        this.isshow = "block";
      }
    },
    setlanguage(language) {
      this.$store.commit("global/updateLanguage", language);
    },
    changelanguage(e) {
      this.setlanguage(e.target.title);
    }
  }
});
</script>

<style lang="scss" scoped>
#language {
  $size: $lg-gap * 2;
  margin-top: $size;
  position: fixed;
  right: 0;
  top: 20%;
  display: flex;
  z-index: 999;
  @include rightWallIcon;
}
</style>
