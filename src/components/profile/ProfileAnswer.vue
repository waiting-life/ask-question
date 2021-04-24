<template>
  <div class="profile-answers">
    <h3>{{ samePeople ? '我的' : '他的' }}回答</h3>
    <div v-for="(answer, index) in myanswers" :key="index" class="answer-container">
      <a class="answer-title" @click="toQuestionDetail(answer)">{{ answer.title }}</a>
      <a class="answer-nickname" @click="toUserDetail(answer)">{{ answer.nickname }}</a>
      <!-- <div class="answer-time">{{ new Date(answer.created_at).toLocaleDateString() }}</div> -->
      <div class="answer-content">
        {{ answer.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      id: '',
      myanswers: []
    }
  },
  created () { 
    this.id = this.$route.params.id
    this.getAnswers()
  },
  computed: {
    ...mapState(['userInfo']),
    samePeople() {
      return this.userInfo.user_id === this.$route.params.id
    }
  },
  methods: {
    async getAnswers() {
      const { data } = await fetch('/getAnswersByUid', {
        method: 'POST',
        body: JSON.stringify({ id: this.id }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => res.json())
      this.myanswers = data
    },
    toQuestionDetail(answer) {
      this.$router.push({
        path: `/answers/${answer.questionId}`
      })
    },
    toUserDetail(answer) {
      this.$router.push({
        path: `/profile/${answer.userId}/dynamics`
      })
    }
  }
}
</script>

<style  scoped>
  .profile-answers h3{
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;
  }
  .answer-container {
    padding: 15px 0;
    border-bottom: 1px solid #f6f6f6;
  }
  .answer-content {
    margin-top: 10px;
  }
  .answer-title {
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
    display: block;
    margin-bottom: 5px;
  }
  .answer-title:hover {
    color: pink;
  }
  /* .answer-time {
    font-size: 16px;
    color: #8590a6;
    margin-top: 15px;
  } */
  .answer-nickname {
    font-size: 20px;
    color: #444;
    font-weight: 700;
  }
</style>

