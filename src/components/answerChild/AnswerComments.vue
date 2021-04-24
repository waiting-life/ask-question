<template>
  <div class="answer-comments-container">
    <button class="comment-btn" @click="showCommentBox(answer._id,index)">
      <i class="el-icon-chat-round"></i>
      <span>{{ isCommentBoxVisible ? '收起评论' : `${comments_counts}条评论` }}</span>
    </button>
    <div class="comments-container" 
        v-if="isCommentBoxVisible">
      <div class="comments-list">
        <div class="comment-header">
          <h4>{{ comments_counts }}条评论</h4>
        </div>
        <div class="comment-item" v-for="(comment, indey) in comments" :key="comment + indey">
          <div class="CommentInfo">
            <div class="CommentatorInfo">
              <a href="#" class="Commentator-avatar" @click="toClickedUserPage(answer.userId)">
              <img :src="comment.avatarUrl" alt="">
            </a>
            <span @click="toClickedUserPage(answer.userId)" class="Commentator-nickname">{{ comment.nickname}}</span>
            </div>
            <span class="comment-time">{{ new Date(comment.created_at).toLocaleString() }}</span>
            <el-button @click="deleteComment(comment)" 
              v-if="comment.userId === userInfo.user_id" 
              size="small"
              type="danger">
              删除评论
            </el-button>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
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
          v-model="commentInfo.content"
          class="commment-input">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitComment(commentInfo, answer._id)">发表评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    answer: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      isCommentBoxVisible: false,
      commentInfo: {
        content: '',
        nickname: '',
        answerId: '',
        userId: '',
        avatarUrl: ''
      },
      comments: [],
      comments_counts: 0,
      currentIndex: 0,
    }
  },
  created () {
    this.getCommentsByAid(this.answer._id)
  },
  
  methods: {
    showCommentBox(answerId, index) {
      this.currentIndex = index
      this.isCommentBoxVisible = !this.isCommentBoxVisible
      this.getCommentsByAid(answerId)
    },
    async getCommentsByAid(answerId) {
      try {
        const res = await fetch('/getCommentsByAid', {
          method: 'POST',
            body: JSON.stringify({answerId: answerId}),
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
    },
    async submitComment(commentInfo, answerId) {
      commentInfo.answerId = answerId
      commentInfo.nickname = this.userInfo.nickname
      commentInfo.userId = this.userInfo.user_id
      commentInfo.avatarUrl = this.userInfo.avatarUrl
      if(commentInfo.content === '') {
        return false
      }
       try {
        const res = await fetch('/addCommentByAid', {
          method: 'POST',
          body: JSON.stringify(commentInfo),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        await res.json()
        this.$message.success("评论发布成功")
        this.getCommentsByAid(answerId)
        this.commentInfo.content = ''
      } catch {
        this.$message.error('评论失败');
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
    async deleteComment(comment) {
      try {
        await this.$confirm('是否要删除评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await fetch('/deleteComment', {
          method: 'POST',
          body: JSON.stringify({ id: comment._id }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        const result = res.json()
        const code = result.err_code
        if (code === 0) {
          this.$message.success('删除成功')
        }
        this.getCommentsByAid()
        this.$message.success('删除成功')
      } catch {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>
<style scoped>
.comments-container {
  margin-top: 12px;
  border-radius: 4px;
  box-shadow: rgb(18 18 18 / 10%) 0px 1px 3px;
  border: 1px solid rgb(235, 235, 235);
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
  cursor: pointer;
}
.Commentator-avatar img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.comment-item {
  padding: 16px 20px;
}
.submit-comment-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.commment-input {
  width: 500px;
}
.comment-btn {
  color: #8590a6;
  margin-left: 24px;
  font-size: 14px;
}
.comment-btn i{
  margin-right: 5px;
}
</style>