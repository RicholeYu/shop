const Controller = require("egg").Controller
const mongoose = require("mongoose")

class UserController extends Controller {
    async signup() {
        const data = this.ctx.request.body
        const isRightSignUpParam = checkSignUpParam(data)
        if (this.ctx.sesion && this.ctx.session.ck) {
            this.ctx.service.ajax.error("你已登录", this.ctx.service.ajax.errorId("注册信息验证不通过"))
            return
        }
        if (isRightSignUpParam !== true) {
            this.ctx.service.ajax.error(isRightSignUpParam, this.ctx.service.ajax.errorId("注册信息验证不通过"))
            return
        }
        const isHasSameName = await this.hasThisName(data.username)
        if (isHasSameName) {
            this.ctx.service.ajax.error("已拥有该用户名", this.ctx.service.ajax.errorId("已拥有该用户名"))
            return
        }
        const isCreateSuccess = await this.createAccount(data)
        if (isCreateSuccess) {
            this.ctx.service.ajax.success({
                "message": "注册成功",
            })
        } else {
            this.ctx.service.ajax.error("注册失败", this.ctx.service.ajax.errorId("注册失败"))
        }
    }

    async signin() {
        const data = this.ctx.request.body
        const isRightSignInParam = checkSignInParam(data)
        if (isRightSignInParam !== true) {
            this.ctx.service.ajax.error(isRightSignInParam, this.ctx.service.ajax.errorId("请输入正确的登录信息"))
            return
        }
        const account = await this.signInAccount(data)
        if (account && account.length === 1) {
            const id = account[0]._id.toString()
            this.ctx.session.ck = this.service.ck.createCk(id)
            this.ctx.session._userid = id
            this.ctx.service.ajax.success({
                "message": "登录成功",
            })
        } else {
            this.ctx.service.ajax.error("账号密码错误", this.ctx.service.ajax.errorId("账号密码错误"))
        }

    }

    hasThisName(name) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.find({ "username": name }, (err, docs) => {
                if (err || (docs && docs.length !== 0)) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    signInAccount(data) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.find({ "username": data.username, "password": data.password }, (err, docs) => {
                if (err || (docs && docs.length === 0)) {
                    resolve(false)
                } else {
                    resolve(docs)
                }
            })
        })
    }

    updateLoginTime(id) {
        this.ctx.model.UserInfo.update({ "_id": mongoose.mongo.ObjectId(id) }, { "last_login_time": new Date() })
    }

    updateCk() {
        this.ctx.session._ck = this.ctx.service.ck.updateCk(this.ctx.session._userid, this.ctx.session._ck)
    }

    isLogin() {
        if (this.ctx.session._userid && this.ctx.session._ck && this.isRightCk()) {
            this.updateLoginTime()
            this.updateCk()
        }
        return false
    }

    createAccount(data) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.create({
                "username": data.username,
                "password": data.password,
                "email": data.email,
                "name": data.name,
            }, (err, docs) => {
                if (err) {
                    resolve(false)
                } else if (docs) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}

function checkSignUpParam(data) {
    if (!data.username) {
        return "请填写用户名"
    } else if (!data.password) {
        return "请填写密码"
    } else if (!data.name) {
        return "请填写名字"
    } else if (data.name.length < 5) {
        return "用户名不得少于5位"
    } else if (data.password.length < 6) {
        return "密码不得少于6位"
    }
    return true
}

function checkSignInParam(data) {
    if (!data.username) {
        return "请填写用户名"
    } else if (!data.password) {
        return "请填写密码"
    }
    return true
}

module.exports = UserController
