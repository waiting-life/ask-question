<template>
  <div class="profile-dynamic">
    <h3>{{ samePeople ? '我的' : '他的' }}动态</h3>
    <!-- {{ dynamicsData }} -->
    <div class="dynamic-container" v-for="(item, index) in dynamicsData" :key="index">
      <div class="dynamic-description">
        <div v-if="item.type==='question'">
          添加了问题
        </div>
        <div v-else-if="item.type==='answer'" >
          回答了问题
        </div>
        <div class="dynamic-time">{{ new Date(item.created_at).toLocaleDateString() }}</div>
      </div>
      <div class="dynamic-detail">
        <h4 class="dynamic-title" @click="toDetailPage(item)">
          {{ item.title }}
        </h4>
        <div class="dynamic-content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: '',
      dynamicsData: []
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDynamics()
  },
  computed: {
    ...mapState(['userInfo']),
    samePeople() {
      return this.userInfo.user_id === this.$route.params.id
    }
  },
  methods: {
    async getDynamics() {
      const { data } = await fetch('/getDynamicsByUid', {
        method: 'POST',
        body: JSON.stringify({ id: this.id }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(res => res.json())
      const { questions, answers } = data
      questions.forEach(question => question.type = 'question')
      answers.forEach(answer => {
        // this.getQuestion(answer)
        answer.type = 'answer'
      })
      // comments.forEach(comment => comment.type = 'comment')
      // console.log(questions, answers, comments)
      // this.dynamicsData = [...questions, ...answers, ...comments].sort(this.compare('created_at'))
      this.dynamicsData = [...questions, ...answers].sort(this.compare('created_at'))
    },
    compare(property) {
      return function(obj1, obj2) {
        const value1 = new Date(obj1[property]);
        const value2 = new Date(obj2[property]);
        return value2.getTime() - value1.getTime(); 
      }
    },
    // async getQuestion(answer) {
    //   const { data } = await fetch('/getQuestionByid', {
    //     method: 'POST',
    //     body: JSON.stringify({question_id: answer.questionId}),
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8'
    //     }
    //   }).then(res => res.json())
    //   answer.title = data.title
    // },
    toDetailPage(item) {
      if(item.type === 'answer') {
        this.$router.push({
          path: `/answers/${item.questionId}`
        })
      } else if(item.type === 'question') {
        this.$router.push({
          path: `/answers/${item._id}`
        })
      }
    }
  }
}
</script>
<style scoped>
  .profile-dynamic h3 {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;
  }
  .dynamic-container {
    padding: 15px 0; 
    border-bottom: 1px solid #f6f6f6;
  }
  .dynamic-description {
    font-size: 16px;
    color: #8590a6;
    display: flex;
    height: 32px;
    justify-content: space-between;
  }
  .dynamic-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
  } 
  .dynamic-content {
    font-size: 18px;
  }
  h4 {
    cursor: pointer;
  }
  h4:hover {
    color: pink;
  }
</style>