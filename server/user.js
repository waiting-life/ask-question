const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // _id: {
  //   type: String,
  //   required: true
  // },
  created_time: {
    type: Date,
    default: Date.now
  },
  last_modefied_time: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  // avatar: {
  //   type: String,
  //   default: '/public/img/avatar-default.png'
  // },
  status: {
    type: Number,
    // 是否可以评论
    // 是够可以登录使用
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  },
  bgImageUrl: {
    type: String
    // default: '~assets/image/defaultBg.jpg'
  },
  fans: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)