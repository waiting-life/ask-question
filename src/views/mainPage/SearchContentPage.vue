<template>
    <div class="search-content">
      <div class="search-container" v-for="(item, index) in searchDatas" :key="index">
        <div class="title" @click="toClickedPage(item)">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchDatas: []
    }
  },
  created () {
    this.getSearchs() 
  },
  watch: {
    $route() {
      this.getSearchs()
    }
  },
  methods: {
    async getSearchs() {
      const { data } = await fetch(`/search?keywords=${this.$route.query.keywords}`)
                              .then(res => res.json())
      this.searchDatas = data
    },
    toClickedPage(item) {
      console.log(item)
      this.$router.push({
        path: `/answers/${item._id}`
      })
    }
  }
}
</script>

<style scoped>
  .search-content {
    margin: 75px auto 0;
    width: 960px;
    
    color: #121212;
  }
  .search-container {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    margin-top: 15px;
    box-shadow: 0 1px 2px 1px rgba(18,18,18,.1);
    border-radius: 4px;
  }
  .search-container .title {
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
  }
  .search-container .title:hover {
    color: pink;
  }
  .search-container .content {
    margin-top: 10px;
    font-size: 16px;
  }

</style>
