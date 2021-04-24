const mongoose = require('mongoose')
const Question = require('./questions')
const Answer = require('./answers')
const Comment = require('./comments')
const User = require('./user')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
  Question,
  Answer,
  Comment,
  User
}