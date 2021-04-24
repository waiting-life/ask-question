<template>
  <div class="profile-ask">
    <h3>{{ samePeople ? '我的' : '他的' }}提问</h3>
    <div v-for="(question, index) in myquestions" :key="index" class="ask-container">
      <a class="ask-title" @click="toQuestionDetail(question)">{{ question.title }}</a>
      <div class="ask-time">{{ new Date(question.created_at).toLocaleDateString() }}</div>
       <!-- <div class="answer-content">
        {{ answer.content }}
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      id: '',
      myquestions: []
    }
  },
  created () { 
    this.id = this.$route.params.id
    this.getQuestions()
  },
  computed: {
    ...mapState(['userInfo']),
    samePeople() {
      return this.userInfo.user_id === this.$route.params.id
    }
  },
  methods: {
    async getQuestions() {
      const { data } = await fetch('/getQuestionsByUid', {
        method: 'POST',
        body: JSON.stringify({ id: this.id }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => res.json())
      this.myquestions = data
    },
    toQuestionDetail(question) {
      this.$router.push({
        path: `/answers/${question._id}`
      })
    }
  }
}
</script>

<style  scoped>
  .profile-ask h3 {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;
  }
  .ask-container {
    padding: 15px 0;
  }
  .ask-title {
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
  }
  .ask-title:hover {
    color: pink;
  }
  .ask-time {
    font-size: 18px;
    color: #8590a6;
    margin-top: 10px;
  }
</style>

