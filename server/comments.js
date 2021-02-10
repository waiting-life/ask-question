const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema

const commentSchema = new Schema({
  userId: {
    type: String,
  },
  answerId: {
    type: String
  },
  comment_nickname: {
    type: String
  },
  comment_content: {
    type: String,
    required: true
  },
  comment_time: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)