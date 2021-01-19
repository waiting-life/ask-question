const Koa = require('koa')
const static = require('koa-static')
// const Router = require('koa-router')  /**引入实例化路由*/
// const logger = require('koa-logger')
// const router = new Router()
const app = new Koa()
// app.use(logger()) // 返回了async函数/返回了一个中间件
// app.use(async (ctx, next) => {
//   console.log(ctx.request.method)
//   console.log(ctx.request.path)
//   await next()
//   console.log(ctx.response.status)
// })
app.use(static('dist'))
app.use(async (ctx, next) => {
  // let method = ctx.request.method
  // let path = ctx.request.path
  // fs.readFile(`dist/${pathname}`)
  // ctx.body = 
  if (method === 'GET' && path === '/') {
    ctx.body = '首页'
  } else if (method === 'GET' && path === '/hahaha') {
    ctx.body = '啊啊啊'
  } 
  else {
    ctx.body = '404!!!'
  }
})


app.listen(3000)






// router
//   .get('/', async (ctx) =>{
//     ctx.body = '首页'
//   })
//   .get('/news', async (ctx) => {
//     ctx.body = '这是新闻页面'
//   })
// app
//   .use(router.routes())   /**启动路由 */
//   .use(router.allowedMethods())   /**可以配置，也可以不配置，建议配置 */
// app.listen(3000)