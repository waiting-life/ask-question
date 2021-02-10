const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema

const answerSchema = new Schema({
 questionId: {
   type: String
 },
 userId: {
   type: String
 },
 answer_nickname: {
  type: String
 },
 answer_content: {
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
})

module.exports = mongoose.model('Answer', answerSchema)