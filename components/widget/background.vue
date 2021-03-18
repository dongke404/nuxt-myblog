<template>
  <div id="background">
    <client-only>
      <div class='background-image' :style="{backgroundImage: 'url(' + coverImgUrl + ')', backgroundSize:'cover'}" ></div>
      <!-- <vue-canvas-nest :config="{color:'244,62,6',count: 99,opacity:0.7}"></vue-canvas-nest> -->

    </client-only>
  </div>
</template>

<script>
export default {
  name: "Background",
  data(){
    return {
      coverImgUrl: "https://www.kedong.me/static/images/app/background.jpg",
    }
  }
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
    opacity: 0.7;
    background-size:cover;
    &.dark {
      opacity: 0.3;
    }
  }
}
</style>
