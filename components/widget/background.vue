<template>
  <div id="background">
    <div class="background-image " ></div>
  </div>
</template>

<script>
export default {
  name: "Background",
};
</script>

<style lang="scss" scoped>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: $z-index-underground;
  background-color: $body-bg;

  > .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: url("https://surmon.me/images/background.png");

    &.dark {
      opacity: 0.2;
    }
  }
}
</style>
