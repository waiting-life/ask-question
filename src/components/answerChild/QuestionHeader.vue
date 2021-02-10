<template>
  <div class="question-header">
    <div class="question-header-content">
      <div class="question-header-main">
        <div class="tags-list">
          <ul>
            <li><button>日本动漫</button></li>
          </ul>
        </div>
        <div>
          <h1 class="question-header-title">{{ currentQuestion.title}}</h1>
          <div class="question-header-text">
            <span>{{ currentQuestion.content}}</span>
          </div>
        </div>
        <div class="questions-header-footer">
          <div class="question-header-btns">
            <div class="footer-left">
              <button>关注问题</button>
              <button @click="showAnswerBox">
                <i class="el-icon-edit"></i>
                <span>写回答</span>
              </button>
            </div>
            <div class="footer-center">
              <div class="invite-answer">
                <button>
                  <svg class="Zi Zi--Invite Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
                    <path d="M4 10V8a1 1 0 1 1 2 0v2h2a1 1 0 0 1 0 2H6v2a1 1 0 0 1-2 0v-2H2a1 1 0 0 1 0-2h2zm10.455 2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7 6c0-2.66 4.845-4 7.272-4C17.155 14 22 15.34 22 18v1.375c0 .345-.28.625-.625.625H8.08a.625.625 0 0 1-.625-.625V18z" fill-rule="evenodd"></path>
                  </svg>
                  <span>邀请回答</span>
                </button>
              </div>
              <div class="good-question footer-item">
                <svg class="Zi Zi--Like Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z" fill-rule="evenodd"></path></svg>
                <span>好问题</span>
                <span class="item-counts">12</span>
              </div>
              <div class="share footer-item">
                <i class="el-icon-s-promotion"></i>
                <span>分享</span>
              </div>
              <div class="more footer-item">
                <i class="el-icon-more"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="question-header-side">
        <div class="header-side-container">
          <div class="following">
            <a href="#">
              <div class="following-text">关注者</div><div class="following-counts">12</div>
            </a>
          </div>
          <div class="browsed">
            <div class="browsed-text">被浏览</div><div class="browsed-counts">4561</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'common/bus'
export default {
  data () {
    return {
      currentQuestion: {},
      // 控制回答框是否显示
      isAnswerboxVisible: false
    }
  },
  created() {
    this.getQuestionById()
  },
  methods: {
    async getQuestionById () {
      const question_id = this.$route.params.id
      const res = await fetch('/getQuestionById', {
        method: 'POST',
        body: JSON.stringify({question_id: question_id}),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const result = await res.json()
      this.currentQuestion = result.data
    },
    showAnswerBox () {
      this.isAnswerboxVisible = true
      bus.$emit('showAnswerBox', this.isAnswerboxVisible)
    }
  }
}
</script>
<style scoped>
.question-header {
  margin-top: 62px;
  background-color: #fff;
}
.question-header-content {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  padding: 20px 40px 10px;
  justify-content: space-between;
}
.question-header-main {
  width: 750px;
  padding-bottom: 10px;
}
.question-header-btns {
  display: flex;
}
.question-header-title {
   margin-top: 12px;
   margin-bottom: 4px;
   font-size: 22px;
   font-weight: 600;
}
.questions-header-footer {
  height: 38px;
}
.footer-left {
  width: 224px;
  height: 34px;
  margin: 0 -8px;
}
.footer-left button {
  width: 96px;
  height: 100%;
  padding: 0 16px;
  margin: 0 8px;
  border-radius: 4px;
}
.footer-left button:nth-child(1) {
  background-color: #0066ff;
  color: #fff;
}
.footer-left button:nth-child(2) {
  background-color: #fff;
  color: #0066ff;
  border: 1px solid #0066ff;
}
.footer-center {
  display: flex;
  align-items: center;
  height: 34px;
  color: #8590a6;
  font-size: 14px;
  padding: 0 16px;
}
.invite-answer {
  margin-right: 120px;
}
.invite-answer button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 34px;
  font-size: 14px;
  color: #8590a6;
  border: 1px solid #8590a6;
}
.footer-item {
  margin: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.footer-item span:nth-child(2) {
  margin: 0 4px;
}
.question-header-text {
  margin: 16px 0;
}

.question-header-side {
  position: relative;
  flex: 1;
}

.header-side-container {
  position: absolute;
  right: 0;
  display: flex;
  width: 200px;
}
.following {
  border-right: 1px solid #ccc;
}
.following a, .browsed {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 54px;
  padding: 0 8px;
}
.following:hover .following-text, 
.following:hover .following-counts{
  color: #175199;
}
.following-text, .browsed-text {
  font-size: 14px;
  color: #8590a6;
  margin-bottom: 10px;
}
.following-counts, .browsed-counts {
  font-size: 18px;
  color: #121212;
  font-weight: 600;
}
</style>