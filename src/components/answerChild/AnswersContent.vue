<template>
  <div class="answers-container">
    <div class="answers-container-main">
      <div class="answer-box" :class="{ AnswerboxVisible: isAnswerboxVisible ? true : false}">
        <header class="answer-box-header">
          <span class="user-nickname">{{ userInfo.nickname }}</span>
          <span class="anonymous-answer">使用匿名者身份回答</span>
        </header>
        <div class="answer-box-main">
          <el-form :model="answerInfo">
            <el-form-item 
              :rules="[
                { required: true, message: '回答不能为空'},
              ]">
              <el-input
                type="textarea"
                placeholder="写回答"
                v-model="answerInfo.answer_content"
                rows="10"
                >
              </el-input>
            </el-form-item>
            <el-form-item class="Answerform-footer">
              <div class="Answerform-footer-main">
                <button class="Answerform-footer-setting">
                  <svg class="Zi Zi--Settings Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M20.868 17.185a.896.896 0 0 1-.452.137c-.123 0-1.397-.26-1.617-.233-1.354.014-1.78 1.276-1.835 1.742-.055.453 0 .892.191 1.303a.8.8 0 0 1-.068.851C16.224 21.877 14.922 22 14.73 22a.548.548 0 0 1-.356-.151c-.11-.096-.685-1.138-1.069-1.468-1.304-.955-2.247-.329-2.63 0-.398.33-.672.7-.836 1.125a.632.632 0 0 1-.329.37c-1.354.426-2.918-.919-3.014-1.056a.564.564 0 0 1-.123-.356c-.014-.138.383-1.276.342-1.688-.342-1.9-1.836-1.687-2.096-1.673a3.192 3.192 0 0 0-.918.178.873.873 0 0 1-.59-.055c-.887-.462-1.136-2.332-1.109-2.51.055-.315.192-.521.438-.604.425-.164.809-.452 1.151-.85.931-1.262.343-2.25 0-2.634-.342-.356-.726-.645-1.15-.809-.138-.041-.234-.151-.33-.316-.38-1.434.613-2.552.867-2.77.255-.22.6-.055.723 0 .425.164.877.219 1.343.15C6.7 6.636 6.784 5.141 6.81 4.908c.014-.247-.11-1.29-.137-1.4a.488.488 0 0 1 .027-.315C7.317 2.178 9.071 2 9.222 2a.56.56 0 0 1 .439.178c.11.124.63 1.111 1 1.4.4.338 1.583.83 2.59.013.397-.274.959-1.29 1.082-1.413A.55.55 0 0 1 14.717 2c1.56 0 2.329 1.029 2.438 1.22a.458.458 0 0 1 .069.371c-.028.151-.329 1.152-.26 1.605.365 1.537 1.383 1.742 1.89 1.783.493.028 1.644-.356 1.809-.343a.63.63 0 0 1 .424.206c.535.31.85 1.715.905 2.14.027.233-.014.439-.11.562-.11.138-1.165.714-1.48 1.112-.855.982-.342 2.25-.068 2.606.26.37 1.22.905 1.288.96.15.137.26.302.315.494.146 1.413-.89 2.387-1.069 2.47zm-8.905-.535c.644 0 1.246-.123 1.822-.356a4.576 4.576 0 0 0 1.493-1.016 4.694 4.694 0 0 0 1-1.495c.247-.562.357-1.18.357-1.81 0-.659-.11-1.262-.356-1.825a4.79 4.79 0 0 0-1-1.481 4.542 4.542 0 0 0-1.494-1.002 4.796 4.796 0 0 0-3.631 0 4.627 4.627 0 0 0-1.48 1.002c-.424.425-.767.919-1 1.481a4.479 4.479 0 0 0-.37 1.825c0 .644.124 1.248.37 1.81a4.62 4.62 0 0 0 1 1.495c.425.426.918.768 1.48 1.016a4.677 4.677 0 0 0 1.809.356z" fill-rule="evenodd"></path></svg>
                  <span>设置</span>
                </button>
                <div class="submit-answer" @click="addAnswer(answerInfo)">
                  <el-button type="primary">提交回答</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <header class="header-container">
        <div class="header-list">
          <h4 class="header-list-text">
            {{ answers_counts }}个回答
          </h4>
          <div class="header-list-options">
            <span>默认排序</span>
          </div>
        </div>
      </header>
      <div class="answers-list">
        <div class="answers-list-item" v-for="(answer, index) in allAnswers" :key="answer + index">
          <header>
            <div class="AuthorInfo">
              <div class="Author-avatar">
                <a href="" @click="toClickedUserPage(answer.userId)"><img src="~assets/image/lgAvator.jpg" alt=""></a>
              </div>
              <div class="Author-text">
                <a href="#" class="AuthorInfo-name" @click="toClickedUserPage(answer.userId)">{{ answer.answer_nickname }}</a>
                <div class="Author-signature">吃饭、睡觉、打豆豆</div>
              </div>
            </div>
            <!-- <div class="Approval-times">
              <button class="Approval-btn">
                到处挖坑蒋玉成等 257 人赞同了该回答
              </button>
            </div> -->
          </header>
          <p class="AuthorAnswer-content">
            {{ answer.answer_content }}
          </p>
          <!-- <button class="comment-btn" @click="getCommentsByAid(answer.answerId, index)">
            点击获取评论列表
          </button> -->
          <button class="comment-btn" @click="showCommentBox(answer._id, index)">
            <i class="el-icon-chat-round"></i>
            <span>{{isCommentBoxVisible ? '收起评论' : `${comments_counts}条评论`}}</span>
          </button>
          <!-- <div class="AuthorAnswer-footer">
            <button class="comment-btn" @click="showCommentBox(answer._id, index)" 
              :class="{ShowCommentBtn: isCommentBoxVisible ? currentIndex === index :false}">
              <i class="el-icon-chat-round"></i>
              <span class="comments-counts">{{ comments_counts }} 条评论</span>
            </button>
            <button class="comment-btn comment-btn-two" @click="hiddenCommentBox"
              :class="{HiddenCommentBtn: isCommentBoxVisible  ? currentIndex === index : false}">
              <i class="el-icon-chat-round"></i>
              <span class="comments-counts">收起评论</span>
            </button>
          </div> -->
          <!-- 评论列表 -->
          <div class="comments-container" 
              v-if="currentIndex === index"
              :class="{ CommentBoxVisible: isCommentBoxVisible ? currentIndex === index : false}">
            <div class="comments-list">
              <div class="comment-header">
                <h4>{{ comments_counts }}条评论</h4>
              </div>
              <div class="comment-item" v-for="(comment, indey) in comments" :key="comment + indey">
                <div class="CommentInfo">
                  <div class="CommentatorInfo">
                    <a href="#" class="Commentator-avatar" @click="toClickedUserPage(answer.userId)">
                    <img src="~assets/image/唯.jpg" alt="">
                  </a>
                  <span @click="toClickedUserPage(answer.userId)" class="Commentator-nickname">{{ comment.comment_nickname}}</span>
                  </div>
                  <span class="comment-time">{{ new Date(comment.comment_time).toLocaleString() }}</span>
                </div>
                <div class="comment-content">
                  <p>{{ comment.comment_content }}</p>
                </div>
              </div>
            </div>
          </div>
          <el-form :model="commentInfo" class="submit-comment-container">
            <el-form-item 
              :rules="[
                { required: true, message: '评论不能为空'}]"
                class="comment-input-box">
              <el-input
                type="textarea"
                placeholder="写下你的评论"
                v-model="commentInfo.comment_content"
                class="commment-input">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitComment(commentInfo, answer)">发表评论</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="answers-container-side">
      侧边栏
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import bus from 'common/bus'
export default {
  data () {
    return {
      answerInfo: {
        answer_content: '',
        answer_nickname: '',
        userId: '',
        questionId: ''
      },
      isAnswerboxVisible: false,
      allAnswers: [],
      answers_counts: 0,
      isCommentBoxVisible: false,
      commentInfo: {
        comment_content: '',
        comment_nickname: '',
        answerId: '',
        userId: ''
      },
      comments: [],
      comments_counts: 0,
      currentIndex: 0,
      Aids: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.getAnswersByQid()
  },
  mounted() {
    bus.$on('showAnswerBox', isAnswerboxVisible => {
      this.isAnswerboxVisible = isAnswerboxVisible
    })
  },
  methods: {
    async addAnswer(answerInfo) {
      answerInfo.userId = this.userInfo.user_id
      answerInfo.answer_nickname = this.userInfo.nickname
      answerInfo.questionId = this.$route.params.id
      // console.log(answerInfo)
      try {
        const res = await fetch('/addAnswer', {
          method: 'POST',
          body: JSON.stringify(answerInfo),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        await res.json()
        this.getAnswersByQid()
        this.$message.success("回答发布成功")
        this.isAnswerboxVisible = false
      } catch {
        this.$message.error('回答不能为空');
      }
    },
    async getAnswersByQid() {
      const questionId = this.$route.params.id
      // console.log(questionId)
      const res = await fetch('/getAnswersByQid', {
        method: 'POST',
        body: JSON.stringify({question_id: questionId}),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      const { data } = await res.json()
      this.allAnswers = data
      this.answers_counts = data.length
      // console.log(this.allAnswers)
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
    showCommentBox(Aid, index) {
      // console.log(index)
      console.log(Aid)
      this.getCommentsByAid(Aid)
      this.currentIndex = index
      this.isCommentBoxVisible = !this.isCommentBoxVisible
      // console.log(Aid)
    },
    hiddenCommentBox() {
      this.isCommentBoxVisible = false
    },
    async submitComment(commentInfo, answer) {
      // console.log(answer)
      commentInfo.answerId = answer._id
      commentInfo.comment_nickname = this.userInfo.nickname
      commentInfo.userId = this.userInfo.user_id
       try {
        const res = await fetch('/addCommentByAid', {
          method: 'POST',
          body: JSON.stringify(commentInfo),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        await res.json()
        this.getCommentsByAid()
        this.$message.success("评论发布成功")
      } catch {
        this.$message.error('评论失败');
      }
    },
    async getCommentsByAid(Aid) {
      try {
        const res = await fetch('/getCommentsByAid', {
          method: 'POST',
            body: JSON.stringify({answerId: Aid}),
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        })
        const { data } = await res.json()
        this.comments = data
        this.comments_counts = this.comments.length
        // console.log(data)
      } catch {
        this.$message.error('获取评论出错')
      }
    }
  }
}
</script>
<style scoped>
.answers-container {
  display: flex;
  width: 1100px;
  margin: 10px auto;
  padding: 0 20px;
}
.answers-container-main {
  width: 750px;
  /* background-color: #fff; */
  margin-right: 10px;
}
.header-container {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
}
.header-list {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
}
.header-list-text {
  font-size: 15px;
  font-weight: 600;
  color: #121212;
}
.header-list-options {
  color: #8590a6;
  font-size: 14px;
}
.answers-container-side {
  flex: 1;
  background-color: #fff;
}

/* 回答模块 */
.answer-box {
  background-color: #fff;
  display: none;
  margin-bottom: 10px;
}
.AnswerboxVisible {
  display: block;
}
.answer-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
}
.answer-box-header .anonymous-answer {
  font-size: 14px;
  color: #8590a6;
}
.answer-box-header .user-nickname {
  color: #444;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.1;
}
.answer-box-main {
  padding: 16px 20px;
}
/* .submit-answer{
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 14px;
  color: #fff;
  background-color: #06f;
} */
.Answerform-footer-setting {
  display: flex;
  align-items: center;
  color: #8590a6;;
  font-size: 14px;
  cursor: pointer;
}
.Answerform-footer-setting svg {
  margin-right: 5px;
} 
.Answerform-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 52px;
  padding: 12px 0;
}
.Answerform-footer-main {
  display: flex;
  width: 170px;
  height: 34px;
}
.submit-answer {
  padding-left: 22px;
}

/* 渲染答案模块 */
.answers-list {
  background-color: #fff;
  padding: 16px 20px;
}
.answers-list-item {
  border-bottom: 1px solid #eee;
  padding: 16px 0;
}
.answers-list-item:last-child {
  border: none;
}
.answers-list-item header {
  height: 72px;
}
.AuthorInfo {
  display: flex;
  height: 45px;
  align-items: center;
}
.Author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 16px;
}
.Author-avatar img {
  width: 38px;
  height: 38px;
  vertical-align: middle;
}
.Author-text {
  display: flex;
  height: 45px;
  flex-direction: column;
  justify-content: space-between;
}
.AuthorInfo-name {
  font-size: 15px;
  font-weight: 600;
  color: #444;
}
.Author-signature {
  font-size: 14px;
  color: #646464;
}
.Approval-btn {
  color: #8590a6;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment-btn {
  color: #8590a6;
  margin-left: 24px;
  font-size: 14px;
}
.comment-btn i{
  margin-right: 5px;
}
/* .ShowCommentBtn {
  display: none;
} */
/* .comment-btn-two {
  display: none;
} */
/* .AuthorAnswer-footer .HiddenCommentBtn {
  display: block;
} */
/* 评论模块 */
.comments-container {
  display: none;
  margin-top: 12px;
  border-radius: 4px;
  box-shadow: rgb(18 18 18 / 10%) 0px 1px 3px;
  border: 1px solid rgb(235, 235, 235);
}
.CommentBoxVisible {
  display: block;
}
.comment-header {
  height: 50px;
  line-height: 50px;
  font-weight: 600;
  padding: 0 20px;
}
.CommentInfo {
  display: flex;
  justify-content: space-between;
}
.CommentatorInfo {
  display: flex;
}

.Commentator-avatar {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 5px;
}
.Commentator-nickname {
  font-weight: 500;
}
.Commentator-avatar img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.comment-item {
  padding: 16px 20px;
}
/* 发表评论模块 */
.submit-comment-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.commment-input {
  width: 500px;

}
</style>