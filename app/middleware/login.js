module.exports = async (ctx, next) => {
    if (ctx.session && ctx.session.ck) {
        await next()
        return
    }
    ctx.service.ajax.error("账户已失效，请重新登录", 999)
}
