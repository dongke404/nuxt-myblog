<template>
  <div id="theme">
    <div class="ricon-boxs" :class="theme">
      <div v-for="(item,index) in themes" :key="index" class="ricon-box" :style="{display:isshow}">
        <i @click="changeTheme" :title="item" class="iconfont" :class="`icon-${item}`"></i>
      </div>
    </div>
    <div class="ricon-current" :class="theme" @click="showTheme">
      <i class="iconfont" :class="`icon-${theme}`"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import systemConstants from "~/constants/system";
import { getStorageReader } from "~/utils/local-storage";

export default Vue.extend({
  name: "Theme",
  data() {
    return {
      isshow: "none"
    };
  },
  computed: {
    theme() {
      return this.$store.state.global.theme;
    },
    themes() {
      let themes = [];
      let obj = systemConstants.Theme;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          themes.push(element);
        }
      }
      return themes;
    }
  },
  methods: {
    showTheme() {
      if (this.isshow === "block") {
        this.isshow = "none";
      } else {
        this.isshow = "block";
      }
    },
    setTheme(theme) {
      this.$store.commit("global/updateTheme", theme);
    },
    changeTheme(e) {
      this.setTheme(e.target.title);
    }
  }
});
</script>

<style lang="scss" scoped>
#theme {
  position: fixed;
  right: 0;
  top: 20%;
  display: flex;
  z-index: 999;
  @include rightWallIcon
}
</style>
