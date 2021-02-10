const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema

const questionSchema = new Schema({
  userId: {
    type: String,
  },
  nickname: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Question', questionSchema)