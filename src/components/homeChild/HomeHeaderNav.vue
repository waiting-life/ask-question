<template>
  <div class="home-header-nav">
    <ul>
      <li v-for="(item, index) in headTags" 
          :key="index+item"
          @click="jumpTagPage(item, index)"
          >
          <a :class="{navActive: currentIndex === index}">{{ item.navTag }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
       headTags: [
        {
          navTag: '首页',
          name: 'home'
        },
        {
          navTag: '会员',
          name: 'vip'
        },
        {
          navTag: '发现',
          name: 'explore'
        },
        {
          navTag: '等你来答',
          name: 'waiting'
        }
      ],
      // isNavActive: false,
      currentIndex: 0
    }
  },
  methods: {
    jumpTagPage(item, index) {
      this.currentIndex = index
      if (item.name === 'home') {
        this.$router.push('/')
      }
      else {
        this.$router.push({path: `/${item.name}`})
        }
      }
  }
}
</script>
<style>
  .home-header-nav {
    margin-left: 30px;
    color: #8590a6;
    font-size: 16px;
  }
  .home-header-nav ul {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    /* height: 60px; */
  }
 .home-header-nav ul li{
    padding: 0 15px;
  }
  .home-header-nav ul li a {
    display: block;
    height: 60px;
    line-height: 60px;
  }
  .home-header-nav ul li:hover {
    color: #121212;
    cursor: pointer;
  }
  .navActive {
    font-weight: 600;
    color: #121212;
    border-bottom: 3px solid pink;
  }
</style>