const Service = require("egg").Service
const errorId = {
    "注册信息验证不通过": 1001,
    "已拥有该用户名": 1002,
    "注册失败": 1003,
    "请输入正确的登录信息": 1004,
    "账号密码错误": 1005,
}
class Response extends Service {
    error(message, errorId) {
        this.setCors()
        this.ctx.response.body = {
            "success": false,
            "data": {},
            message,
            errorId,
        }
    }
    success(json = {}) {
        this.setCors()
        this.ctx.response.body = {
            "success": true,
            "data": json,
        }
    }
    errorId(msg) {
        return errorId[msg] || "1000"
    }
    setCors() {
        this.ctx.set("Access-Control-Allow-Origin", "*")
        this.ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
    }
}

module.exports = Response
