const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
const User = require('./server/user')
const Question = require('./server/questions')
const Search = require('./server/search')
const Answer = require('./server/answers')
const Comment = require('./server/comments')
const body = require('koa-body')
const static = require('koa-static')
app.use(async (ctx, next)=> {
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  // ctx.set('Access-Control-Allow-Credentials', true)
  // ctx.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Credentials');
  // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next()
});

app.use(body({multipart: true}))
app.use(static('dist'))
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
      const question_id = body.question_id
      const data = await Question.findById(question_id)
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
  // 添加回答
  .post('/addAnswer', async ctx => {
    const body = ctx.request.body
    try {
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

  // 评论接口部分
  .post('/addCommentByAid', async ctx => {
    const body = ctx.request.body
    console.log(body)
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
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)