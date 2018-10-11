

exports.index = ctx => {
    ctx.service.ajax.success({ "a": 1 })
}

exports.common = ctx => {
    ctx.service.ajax.success({ "b": 2 })
}
