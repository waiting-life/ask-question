<template>
  <div class="ask-dialog">
    <el-dialog title="提问" :visible="askDialogVisible" width="40%" center :before-close="cancelAsk">
      <el-form :model="question" :label-position="labelPosition" label-width="80px">
        <el-form-item label="提问标题">
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="question.title"
            maxlength="30"
            show-word-limit
            >
          </el-input>
        </el-form-item>
        <el-form-item label="提问内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="question.content"
            rows="10"
            >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelAsk">取消问题</el-button>
        <el-button type="primary" @click="addQuestion(question)">发布问题</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      labelPosition: 'left',
      question: {
        title: '',
        content: '',
        nickname: '',
        userId: ''
      },
    }
  },
  computed: mapState(['askDialogVisible', 'userInfo']),
  created() {   
    this.getQuestions()
  },
  methods: {
    ...mapActions(['getQuestions']),
    async addQuestion(question) {
      if (question.title === '' || question.content === '') {
        this.$message.error('标题和内容不能为空');
      } else {
        question.nickname = this.userInfo.nickname
        question.userId = this.userInfo.user_id
        await fetch('/addQuestion', {
          method: 'POST',
          body: JSON.stringify(question),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        this.getQuestions()
        this.cancelAsk()
      }
    },
    cancelAsk() {
      this.$store.commit('hiddenAskDialog')
    }
  }
}
</script>
<style scoped>
  ::v-deep .el-textarea__inner{ 
    resize: none;
  }
</style>