const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema
const searchSchema = new Schema({
  searchHistory: {
    type: Array,
    default: []
  }
})
module.exports = mongoose.model('Search', searchSchema)