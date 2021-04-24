const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
const fs = require('fs')
const Search = require('./server/search')
const {
  Question,
  Answer,
  Comment,
  User,
} = require('./server')
const body = require('koa-body')
const koaStatic = require('koa-static')
const logger = require('koa-logger')

app.use(logger())
app.use(async (ctx, next)=> {
  // console.log(ctx.req.url)
  // console.log(111);
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  // ctx.set('Access-Control-Allow-Credentials', true)
  // ctx.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Credentials');
  // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next()
});

app.use(body({multipart: true}))
app.use(koaStatic('image'))
app.use(koaStatic('dist'))
router
  .post('/register', async (ctx) => {
    // 获取表单提交的数据
    // 操作数据库
    // 发送响应
    // 用了koa-body这里ctx.request.body就直接是对象了
    const body = ctx.request.body 
    try {
      let data = await User.findOne({
        nickname: body.nickname
      })
      if (data) {
        // 昵称已存在
        ctx.body = {
          err_code: 1,
          message: '昵称已存在'
        }
      } else {
        await new User(body).save()
        ctx.body = {
          err_code: 0,
          message: 'Ok'
        }
      }
    } catch (err) {
        ctx.body = {
          err_code: 500,
          message: 'Server error'
        }
    }
    
    // let data = await User.findOne({
    //   nickname: body.nickname
    // }, (err, data) => {
    //   if (err) {
    //     ctx.body = {
    //       err_code: 500,
    //       message: 'Server error'
    //     }
    //   } else {
    //     if (data) {
    //       // 昵称已存在
    //       console.log(222);
    //       ctx.body = {
    //         err_code: 1,
    //         message: '昵称已存在'
    //       }
    //     } else {
    //       new User(body).save((err, data) => {
    //         if (err) {
    //           ctx.body = {
    //             err_code: 500,
    //             message: 'Server error'
    //           }
    //         }
    //         ctx.body = {
    //           err_code: 0,
    //           message: 'Ok'
    //         }
    //       })
    //     }
    //   }
    // })
  })
  .post('/login', async (ctx) => {
    // console.log(222)
    const body = ctx.request.body
    // console.log(body)
    try {
      const data = await User.findOne(body)
      // console.log(data)
      if (data) {
        const user_id = encodeURI(data._id)
        ctx.cookies.set('user_id', user_id, {
          httpOnly: false,
        })
        ctx.body = {
          err_code: 0,
          message: 'Cookie设置成功',
          data: data
        }
      } else {
        ctx.body = {
          err_code: 2,
          message: '用户名不存在或用户名密码输入错误，请检查'
        }
      } 
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // .get('/getUserInfo', async ctx => {
  //   try {
  //     const data = await User.find()
  //     ctx.body = {
  //       err_code: 0,
  //       message: 'Ok',
  //       data: data
  //     }
  //   } catch  {
  //     ctx.body = {
  //       err_code: 500,
  //       message: 'Server error'
  //     }
  //   }
  // }) 
  .post('/getUserById', async ctx => {
    //  通过id获取用户信息
    const body = ctx.request.body
    //  console.log(body)
    try {
      const user_id = body.user_id
      const data = await User.findById(user_id)
     if (data) {
        ctx.body = {
          err_code: 0,
          message: 'Ok',
          data: data
        }
     }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 编辑个人资料
  .post('/editProfile', async ctx => {
    const body = ctx.request.body
    // console.log(body)
    try {
      const data = await User.updateOne({ _id: body._id}, {$set:  body})
      ctx.body = {
        data
      }
    } catch  {
      ctx.body  = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 通过id获取动态
  .post('/getDynamicsByUid', async ctx => {
    const body = ctx.request.body
    try {
      let [ questions, answers ] = await Promise.all([
        Question.find({ userId: body.id}),
        Answer.find({ userId: body.id }),
        // Comment.find({ userId: body.id })
      ])
      ctx.body = {
        err_code: 0,
        message: 'OK',
        data: {
          questions,
          answers,
          // comments
        },
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/getQuestionsByUid', async ctx => {
    const body = ctx.request.body
    try {
      const data = await Question.find({ userId: body.id})
      ctx.body = {
        err_code: 0,
        message: 'OK',
        data
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/getAnswersByUid', async ctx => {
    const body = ctx.request.body
    try {
      const data = await Answer.find({ userId: body.id })
      // console.log(data)
      ctx.body = {
        err_code: 0,
        message: 'OK',
        data
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/getCommentsByUid', async ctx => {
    const body = ctx.request.body
    try {
      const data = await Comment.find({ userId: body.id })
      // console.log(data)
      ctx.body = {
        err_code: 0,
        message: 'OK',
        data
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/addQuestion', async ctx => {
    // 添加问题
    const body = ctx.request.body
    try {
      await new Question(body).save()
      ctx.body = {
        err_code: 0,
        message: '提问成功！',
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .get('/allQuestions', async ctx => {
    // 获取所有问题接口
    let data = await Question.find()
    // let newData = JSON.parse(JSON.stringify(data))
    
    ctx.body = {
      err_code: 0,
      message: 'Ok',
      data: [data]
    }
  })
  .post('/deleteQuestion', async ctx => {
    // 删除问题接口
    const body = ctx.request.body
    try {
      const data = await Question.findOne(body)
       await Question.remove(data)
       ctx.body = {
         err_code: 0,
         message: '删除成功'
       }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .get('/delcookie', async ctx => {
    // 删除cookie接口
    ctx.body = {
      err_code: 0,
      message: 'Cookie删除成功'
    },
    //  设为过期前的时间，比如设为0或负数
    ctx.cookies.set('user_id', { maxAge: 0 })
  })
  .get('/getSearchs', async ctx => {
    // 获取搜索信息，热搜，搜索历史
    const  hotSearchs = ['今天吃什么o-o', '昨天吃的啥^-^', '明天吃什么x_x', '要吃零食吗ovo', '程皮皮睡着了=-=']  
    try {
      const searchHistory = await Search.find()
      ctx.body = {
        data: {
          hotSearchs,
          searchHistory
        },
        err_code: 0,
        message: 'Ok'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  }) 
  .post('/addSearchHistory', async ctx => {
    // 添加搜索记录接口
    const body = ctx.request.body
    try {
      await new Search(body).save()
      ctx.body = {
        err_code: 0,
        message: '成功添加搜索记录'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/deleteSearchAll', async ctx => {
    // 全部删除
    try {
      await Search.deleteMany({})
      ctx.body = {
        err_code: 0,
        message: '删除记录成功'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/deleteSearchOne', async ctx => {
    // 删除一个
    const body = ctx.request.body
    try {
      await Search.deleteOne(body)
      ctx.body = {
        err_code: 0,
        message: '删除成功'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 根据id获取问题
  .post('/getQuestionById', async ctx => {
    const body = ctx.request.body
    try {
      const data = await Question.findById(body.question_id)
      if (data) {
        ctx.body = {
          err_code: 0,
          message: 'Ok',
          data
        }
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 添加回答
  .post('/addAnswer', async ctx => {
    const body = ctx.request.body
    try {
      // await Question.findById()
      await new Answer(body).save()
      ctx.body = {
        err_code: 0,
        message: '回答成功！',
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 获取回答列表
  .post('/getAnswersByQid', async ctx => {
    const body = ctx.request.body
    // console.log(body)
    try {
      const questionId = body.question_id
      // console.log(questionId)
      const data = await Answer.find({ questionId: questionId})
      if (data) {
        ctx.body = {
          data: data,
          err_code: 0,
          message: 'Ok'
        }
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/deleteAnswer', async ctx => {
    const { id } = ctx.request.body
    try {
      const data = await Answer.findById(id)
      await Answer.remove(data)
      ctx.body = {
        err_code: 0,
        message: '回答删除成功'
      }
    } catch {
      ctx.body= {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 评论接口部分
  .post('/addCommentByAid', async ctx => {
    const body = ctx.request.body
    // console.log(body)
    try {
      await new Comment(body).save()
      ctx.body = {
        err_code: 0,
        message: '评论添加成功'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 根据回答id获取评论列表接口
  .post('/getCommentsByAid', async ctx => {
    const body = ctx.request.body
    // console.log(body)
    try {
      const answerId = body.answerId
      const data = await Comment.find({ answerId: answerId })
      // console.log(data)
      ctx.body = {
        data: data,
        err_code: 0,
        message: 'Ok'
      }
    } catch {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  .post('/deleteComment', async ctx => {
    const { id } = ctx.request.body
    try {
      const data = await Comment.findById(id)
      await Comment.remove(data)
      ctx.body = {
        err_code: 0,
        message: '评论删除成功'
      }
    } catch {
      ctx.body= {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
  // 根据关键字筛选渲染搜索页面
  .get('/search', async ctx => {
    const { keywords } = ctx.request.query
    const data = await Question.find({
      $or: [
        {
          title: new RegExp(`${keywords}`, 'i')
        },
        {
          content: new RegExp(`${keywords}`, 'i')
        }
      ]
    })
    console.log(keywords);
    ctx.body = {
      data
    }
  })
  .post('/updateAvatar', async ctx => {
    console.log(111)
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    const random = Math.floor(Math.random() * 10000)
    const stream = fs.createWriteStream(`./image/${random}.jpg`)
    reader.pipe(stream)
    const { user_id } = ctx.request.body
    try {
      const user = await User.findById(user_id)
      user.avatarUrl = `/${random}.jpg`
      await user.save()
      ctx.body = {
        err_code: 0,
        message: 'OK',
      }
    } catch  {
      ctx.body = {
        err_code: 500,
        message: 'Server error'
      }
    }
  })
app
  .use(router.routes())
  .use(router.allowedMethods())

// history模式，需要写一个兜底路径
app.use(async (ctx) => {
  ctx.redirect('/')
})
app.listen(3000)