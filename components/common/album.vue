<template>
  <div class="imgbox">
    <vue-waterfall-easy ref="waterfall" :imgsArr="photos" @scrollReachBottom="getData">
       <div slot="waterfall-over" >已经没有了</div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
// function createp() {
//   let lst = [];
//   for (let index = 0; index < 50; index++) {
//     let obj = {};
//     obj.id = index;
//     // let tempw = parseInt(Math.random() * (1000 - 100 + 1) + 100, 10);
//     obj.src =
//       "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1111759211,550942899&fm=26&gp=0.jpg";
//     // let temph = parseInt(Math.random() * (1000 - 100 + 1) + 100, 10);
//     obj.href =
//       "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1111759211,550942899&fm=26&gp=0.jpg";
//     lst.push(obj);
//   }
//   console.log(lst);
//   return lst;
// }
// const photos = createp();
export default {
  name: "Album",
  props: {
    photos: {
      type: Array
    },
  },
  methods:{
    getData(){
      this.$emit("updateData")
    },
    loadover(){
        this.$refs.waterfall.waterfallOver()
    }

  }
};
</script>

<style lang="scss" scoped>
.imgbox {
  width: 100%;
  height: 100vh;
}
</style>
