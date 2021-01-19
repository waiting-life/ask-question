const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema

const questionSchema = new Schema({
 
})

module.exports = mongoose.model('Question', questionSchema)