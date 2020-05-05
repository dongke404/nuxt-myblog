<template>
  <div class="file-container">
    <div class="file-search">
      <input class="input" v-model.trim="searchValue" type="text" />
      <button class="btn">
        <i class="iconfont icon-search" @click="search" />
      </button>
    </div>
    <nav class="file-nav">
      <span
        v-for="item in category"
        :key="item"
        class="file-category"
        :class="{
          isActive: item === currCateygory
        }"
        @click="selectType"
      >
        {{ item }}
      </span>
    </nav>
    <div class="file-body">
      <ul class="list">
        <li>
          <div>{{ $i18n.file.resource.value }}</div>
          <div>{{ $i18n.file.update.value }}</div>
          <div>{{ $i18n.file.secret.value }}</div>
        </li>
        <li v-for="(item, index) in files" :key="index">
          <a href="item.fileurl">
            <div>{{ item.name }}</div></a
          >
          <div>{{ item.date }}</div>

          <div v-if="index === currPwd">{{ item.pwd }}</div>
          <div v-else>******</div>
          <i
            class="iconfont icon-view"
            style="cursor:pointer"
            :flag="index"
            @click="showPwd"
          ></i>
        </li>
      </ul>
    </div>
    <client-only>
      <paginate
        v-model="page"
        :page-count="total"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="$i18n.file.prevpage.value"
        :next-text="$i18n.file.nextpage.value"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :active-class="'page-active'"
        :initial-page="1"
      >
      </paginate>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      page: Number(this.$route.params.file_page),
      currCateygory: "全部",
      currPwd: -1,
      searchValue: ""
    };
  },
  validate({ params }) {
    return params.file_page && !isNaN(Number(params.file_page));
  },
  fetch({ store, params }) {
    return store.dispatch("file/fetchList", { page: Number(params.file_page) });
  },
  computed: {
    files() {
      return this.$store.state.file.data;
    },
    total() {
      return Math.ceil(this.$store.state.file.total / 20);
    },
    category() {
      let categorys = [];
      for (const key in this.$i18n.file.category) {
        categorys.push(this.$i18n.file.category[key].value);
      }
      return categorys;
    }
  },
  methods: {
    clickCallback(pageNum) {
      this.$store.dispatch("file/fetchList", {
        page: pageNum,
        category:
          this.$i18n.file.category.all.value === this.currCateygory
            ? ""
            : this.currCateygory
      });
    },
    selectType(e) {
      this.currCateygory = e.target.innerText;
      this.$store.dispatch("file/fetchList", {
        page: 1,
        category:
          this.$i18n.file.category.all.value === this.currCateygory
            ? ""
            : this.currCateygory
      });
    },
    showPwd(e) {
      this.currPwd = Number(e.target.getAttribute("flag"));
    },
    search() {
      this.$store.dispatch("file/fetchList", {
        page: 1,
        keyword: this.searchValue
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.file-nav {
  padding: 3px;
  span {
    cursor: pointer;
  }
  .isActive {
    background-color: #fc9777;
  }
}
.file-category {
  display: inline-block;
  margin: 2px;
  padding: 3px;
  color: $text;
  font-size: $font-size-root;
  font-family: $font-family-sans-serif;
  border-radius: 8px;
  border: 1px solid $text;
}
.file-search {
  float: right;
  .input {
    height: 2em;
    line-height: 2em;
    background-color: $module-hover-bg;
  }
  .btn {
    height: 2em;
    line-height: 2em;
    width: 2em;
    background-color: $module-hover-bg-darken-20;
    @include background-transition();
    &:hover {
      background-color: $module-hover-bg-darken-40;
    }
  }
}
.file-body {
  padding: 5px;
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      div {
        padding: 5px;
      }
      div:nth-child(1) {
        width: 350px;
        padding: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.pagination {
  display: flex;
  list-style: none;
  margin-bottom: 10px;
  padding: 0;
  justify-content: center;
}
.page-item {
  padding: 0 5px 0 5px;
  margin: 0 5px 0 5px;
}
.page-active {
  border: solid $text 1px;
  border-radius: 6px;
}
</style>
