<template>
  <div class="search-model">
    <div class="search-box" :class="{ active: isActive }">
      <div class="search-input">
        <input type="input-text" 
             placeholder="搜索你感兴趣的内容..." 
             @focus="selectSearch"
             @blur="cancelSearch"
             v-model="searchContent"
             @keyup.enter="searchMessage(searchContent)"
             >
             <!-- @input="filterSearch(searchContent)" -->
      </div>
      <div class="serach-icon" 
           @click="searchMessage(searchContent)" 
           :class="{iconBgcolor: searchContent ? true : false}">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div class="search-dialog" :class="{searchDialogActive: isSearchDialogShow}">
      <!-- <div class="hot-search">
        <div class="title">
          <div class="title-text">热搜</div>
        </div>
        <div class="hot-title">
          <ul>
            <li v-for="(item, index) in hotSearchs" 
                :key="item+index"
                @click="addSearch(item)">
              <a href="">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="search-history">
        <div class="title">
          <div class="title-text title-hitory">
            <span>搜索历史</span>
              <div class="delete-search" @click="deleteAll">
                <i class="el-icon-delete"></i>
                <span>清空</span>
              </div>
          </div>
        </div>
        <ul>
          <li v-for="(item, indey) in searchHistory" 
            :key="item+indey">
            <div @click="searchMessage(item)">{{ item }}</div>
            <span @click="deleteOne(indey)"><i class="el-icon-close"></i></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      hotSearchs: [],
      copyHotSearchs: [],
      searchHistory: [],
      isSearchDialogShow: false,
      isActive: false,
      searchContent: '',
      bgColor: false,
    }
  },
  created() {
    // this.getSearchs()
  },
  computed: {
    ...mapState(['questionsInfo'])
  },
  methods: {
    selectSearch() {
      this.isActive = true
      this.isSearchDialogShow = true
      this.$emit('inputFocus', this.isActive)
    },
    cancelSearch() {
      setTimeout(() => {
        this.isActive = false
        this.isSearchDialogShow = false
      }, 300);
      this.$emit('inputBlur')
    },
    addSearch(history) {
      this.searchHistory.push(history)
      this.searchHistory = [...new Set(this.searchHistory)]
    },
    deleteAll() {
      this.searchHistory = []
      // await fetch('/deleteSearchAll', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json; charset=utf-8'
      //   }
      // })
    },
    deleteOne(indey) {
      this.searchHistory.splice(indey, 1)
      // await fetch('/deleteSearchOne', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     searchHistory: item
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json; charset=utf-8'
      //   }
      // })
    },
    async searchMessage(searchContent) {
      if (searchContent === '') {
        return
      } else {
        this.addSearch(searchContent)
        this.$router.push({
          path: `/search?keywords=${searchContent}`
        })
        this.searchContent = ''
      }
    },
    // filterSearch(inputValue) {
    //   if (inputValue !== '') {
    //     this.hotSearchs = this.copyHotSearchs.filter(item => {
    //       return item.includes(inputValue)
    //     })
    //   }
    // },
  }
}
</script>
<style scoped>
  /* 搜索弹框，热搜，搜索历史 */
 .search-dialog {
    display: none;
    background-color: #fff;
    width: 450px;
    /* position: absolute; */
    position: fixed;
    top: 60px;
    left: 670px;
    border-radius: 5px;
    border: 1px solid  #F6F6F6;
    box-shadow: 0px 1px 8px 2px rgba(18,18,18,.1);
    padding-bottom: 12px;
  }
  .searchDialogActive {
    display: block;
  }
 
   /* 搜索框部分 */
   .search-box {
      margin: 0 auto;
      width: 430px;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #F6F6F6; 
   }
   .search-input { 
    padding: 4px 0 4px 16px;  
  }
   .search-box .search-input input {
    width: 360px;
    height: 25px;
    background: none;
  }
  .search-model .active {
    background-color: #fff;
    border: 2px solid pink;
  }


  /* .search-model:focus-within .search-dialog {
    display: block;
  }

  .search-model:not(:focus-within) .search-dialog {
    display: none;
  } */

  
   .serach-icon {
    flex: 1;
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .iconBgcolor {
    background-color: pink;
    color: #fff;
  }

  /* 热搜，搜索历史部分 */
  .title {
    color: #8590a6;
    font-size: 15px;
    padding: 0 15px;
  }
  .title .title-text {
    padding: 10px 15px 8px 15px; 
    border-bottom: 2px solid #f6f6f6;
    display: flex;
  }
  .title-hitory {
    display: flex;
    justify-content: space-between;
  }
  .title-hitory a {
    color:  #8590a6;
  }
  /* 热搜，搜索历史数据样式 */
  ul li a {
    color: #121212;
    display: block;
  }
  ul li {
    padding: 7px 15px;
    cursor: pointer;
  }
  ul :hover {
    background-color: #F6F6F6;
  }
  .search-history ul li{
    display: flex;
    justify-content: space-between;
  }
  .delete-search {
    cursor: pointer;
  }
  .delete-search span {
    margin-left: 5px;
  }
</style>