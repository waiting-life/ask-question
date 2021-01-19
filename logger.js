module.exports = function() {
  return async (ctx, next) => {
    console.log(ctx.request.method)
    console.log(ctx.request.path)
    await next()
    console.log(ctx.response.status)
  }
}