<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;{{ meta.title }}</div>
  </footer>
</template>

<script>
import {meta} from "~/config/app.config";
export default {
  name: "MobileFooter",
  computed: {
    meta: () => meta,
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  margin: 0;
  @include module-blur-bg();

  .footer-content {
    width: 100%;
    height: $mobile-footer-height;
    line-height: $mobile-footer-height;
    font-size: $font-size-h6;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
