module.exports = async (ctx, next) => {
    console.log(ctx.session)
    if (ctx.session && ctx.session.ck) {
        await next()
        return
    }
    this.ctx.service.ajax.error("账户已失效，请重新登录", 999)
}