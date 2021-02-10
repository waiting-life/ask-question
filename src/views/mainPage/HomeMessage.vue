<template>
  <div class="home-message">
    <div class="all-question">
      <div v-for="(item, index) in questionsInfo" 
        :key="index+item" 
        :currentIndex = index 
        class="question-item">
        <div class="question-title" @click="toAnswersById(item._id)">
          <a>{{ item.title }}</a>
        </div>
        <div class="question-content" @click="readFullArticle">{{ item.content }}</div>
        <div class="question-info">         
          <div>
            <a @click="toClickedUserPage(item.userId)">{{ item.nickname }}</a>
            <span>提问于：{{ new Date(item.createTime).toLocaleString() }}</span>
          </div>
          <div class="btns" v-if="item.nickname === nickname">
            <el-button 
              type="danger" 
              size="small" 
              @click="removeQuestion(item)" 
              >
              删除
            </el-button>
          </div>
        </div>       
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      questionId: ''
    }
  },
  computed: mapState({
    nickname() {
      return this.$store.state.userInfo.nickname
    },
    questionsInfo() {
      return this.$store.state.questionsInfo
    }
  }),
  created() {
    this.getQuestions()
  },
  methods: {
    ...mapActions(['getQuestions']),
    async removeQuestion(question) {
      try {
        await this.$confirm('是否要删除问题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/deleteQuestion', {
          method: 'POST',
          body: JSON.stringify(question),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        const result = res.json()
        const code = result.err_code
        if (code === 0) {
          this.$message.success('删除成功')
        }
        this.getQuestions()
      } catch {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async toClickedUserPage(userId) {
      const res = await fetch('/getUserById', {
        method: 'POST',
        body: JSON.stringify({user_id: userId}),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const { data } = await res.json()
      this.$router.push({
        path: `/profile/${data._id}/dynamics`
      })
    },
    readFullArticle() {
      console.log(this)
    },
    toAnswersById(question_id) {
      // console.log(question_id)
      // console.log(this.questionsInfo)
      this.$router.push({
        path: `/answers/${question_id}`
      })
    }
  },
}
</script>
<style scoped>
  .home-message {
    margin: 75px auto 0;
    width: 960px;
    background-color: #fff;
    box-shadow: 0 1px 2px 1px rgba(18,18,18,.1);
    color: #121212;
    padding: 0 40px;
  }
   .question-title {
    font-size: 18px;
    font-weight: 600;
    padding: 20px 0;
  }
  .question-title:hover {
    color: pink;
  }
  .question-content {
    font-size: 16px;
    height: 42px;
    cursor: pointer;
    text-indent: 2em;
    /* 1.溢出的部分隐藏起来 */
    overflow: hidden;
    /* 2.溢出的时候用省略号代替 */
    text-overflow: ellipsis;
    /* 3. 弹性伸缩盒子模型显示 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .question-item {
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 20px;
  }
  .detail-tag {
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    border-bottom: 1px solid #f6f6f6;
  }
  .question-info {
    display: flex;
    padding-top: 15px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .first-input {
    margin-bottom: 30px;
  }
</style>