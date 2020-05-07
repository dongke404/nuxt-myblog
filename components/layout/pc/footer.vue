<template>
  <footer class="footer">
    <div class="footer-content">©{{ year }}&nbsp;&nbsp;{{ appConfig.meta.title }}</div>
  </footer>
</template>

<script>
import appConfig from "~/config/app.config";
export default {
  name: "MobileFooter",
  computed: {
    appConfig: () => appConfig,
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: $footer-height;
  margin-top: $lg-gap;
  user-select: none;
  @include module-blur-bg();

  .container {
    font-size: $font-size-h6;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
