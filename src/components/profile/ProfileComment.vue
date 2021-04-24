<template>
  <div class="profile-comment">
    <div v-for="(comment, index) in mycomments" :key="index" class="comment-container">
      <h4 class="comment-title">{{ comment.title }}</h4>
      <div>
        <p class="comment-content">{{ comment.content }}</p>
        <span class="comment-time">{{ new Date(comment.created_at).toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      mycomments: []
    }
  },
  created () { 
    this.id = this.$route.params.id
    this.getComments()
  },
  
  methods: {
    async getComments() {
      const { data } = await fetch('/getCommentsByUid', {
        method: 'POST',
        body: JSON.stringify({ id: this.id }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => res.json())
      this.mycomments = data
    }
  }
}
</script>

<style  scoped>
  .profile-comment {
    padding: 10px;
  }
  .comment-title {
    font-size: 16px;
    font-weight: 700;
  }
  .comment-content {
    font-size: 16px;
    text-indent: 2em;
  }
  .comment-time {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
  }
</style>

