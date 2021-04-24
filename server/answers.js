const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
 questionId: {
   type: String
 },
 userId: {
   type: String
 },
  signature: {
  type: String
 },
 title: {
  type: String,
  required: true
 },
 avatarUrl: {
   type: String
 },
nickname: {
  type: String
 },
 content: {
   type: String,
   required: true
 },
 agree_counts: {
   type: Number
 },
 follow_counts: {
   type: Number,
   default: 0
 },
 good_counts: {
   type: Number,
   default: 0
 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Answer', answerSchema)