const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [1, 2],
    default: 1
  },
  birthday: {
    type: Date
  },
  avatarUrl: {
    type: String
  },
  // status: {
  //   type: Number,
  //   // 是否可以评论
  //   // 是够可以登录使用
  //   // 0 没有权限限制
  //   // 1 不可以评论
  //   // 2 不可以登录
  //   enum: [0, 1, 2],
  //   default: 0
  // },
  signature: {
    type: String,
    default: ''
  },
  bgImageUrl: {
    type: String
    // default: '~assets/image/defaultBg.jpg'
  },
  fans: {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('User', userSchema)