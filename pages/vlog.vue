<template>
<div>
  <client-only>
    <vue-waterfall-easy :imgsArr="photos"></vue-waterfall-easy>
  </client-only>
  </div>
</template>

<script>
function createp() {
  let lst = [];
  for (let index = 0; index < 50; index++) {
    let obj = {};
    obj.id = index;
    // let tempw = parseInt(Math.random() * (1000 - 100 + 1) + 100, 10);
    obj.src =
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1111759211,550942899&fm=26&gp=0.jpg";
    // let temph = parseInt(Math.random() * (1000 - 100 + 1) + 100, 10);
    obj.href =
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1111759211,550942899&fm=26&gp=0.jpg";
    lst.push(obj);
  }
  console.log(lst);
  return lst;
}
const photos = createp();
export default {
  name: "Album",
  data() {
    return {
      photos: photos
    };
  }
};
</script>

<style lang="scss" scoped>
.imgbox {
  background-color: brown;
}
</style>
