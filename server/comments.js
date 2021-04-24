const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  answerId: {
    type: String
  },
  nickname: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  }
  // comment_time: {
  //   type: Date,
  //   required: true,
  //   default: Date.now
  // }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Comment', commentSchema)