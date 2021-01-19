<template>
  <div class="comment-header">
      <ul >
        <li v-for="(item, index) in tags" 
            :key="index+item" 
            @click="clickTag(item, index)"
            >
          <a :class="{active: currentTagIndex === index}">{{ item.title }}</a>
        </li>
      </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      currentIndex: 0,
      tags: [
        {
          name: 'dynamics',
          title: '动态'
        },
        {
          name: 'answers',
          title: '回答'
        },
        {
          name: 'videos',
          title: '视频'
        },
        {
          name: 'asks',
          title: '提问'
        },
        {
          name: 'posts',
          title: '文章'
        },
        {
          name: 'columns',
          title: '专栏'
        },
        {
          name: 'pins',
          title: '想法'
        },
        {
          name: 'collections',
          title: '收藏'
        },
        {
          name: 'following',
          title: '关注'
        }
      ],
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  computed: mapState(['currentTagIndex']),
  methods: {
    clickTag(tag, index) {
      this.$store.commit('changeCurrentIndex', index)
      this.$router.push({
        path: `/profile/${this.id}/${tag.name}`
      })
    }
  }
}
</script>
<style scoped>
  .comment-header ul {
    border-bottom: 1px solid #f6f6f6;
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .comment-header li {
    padding: 0 10px;
  }
  .comment-header li a{
    display: block;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #121212;
  }
  .active {
    border-bottom: 3px solid pink;
    font-weight: 600;
  }
</style>