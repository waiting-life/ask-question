const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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
  avatarUrl: {
   type: String
 },
  // createTime: {
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

module.exports = mongoose.model('Question', questionSchema)