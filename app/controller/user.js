const Controller = require("egg").Controller
const mongoose = require("mongoose")
const ERROR = require('../public/error')
class UserController extends Controller {
    async signUp () {
        const data = this.ctx.request.body
        const isRightSignUpParam = checkSignUpParam(data)
        if (this.ctx.sesion && this.ctx.session.ck) {
            this.ctx.service.ajax.error("您已经登录啦", ERROR.ALREADY_LOGIN_IN)
            return
        }
        if (isRightSignUpParam !== true) {
            this.ctx.service.ajax.error(isRightSignUpParam, ERROR.SIGN_UP_PARAMS_IS_WRONG)
            return
        }
        const isHasSameEmail = await this.hasThisEmail(data.email)
        if (isHasSameEmail) {
            this.ctx.service.ajax.error("已拥有该邮箱", ERROR.ALREADY_HAS_THIS_EMAIL)
            return
        }
        const isCreateSuccess = await this.createAccount(data)
        if (isCreateSuccess) {
            this.ctx.service.ajax.success({
                "message": "注册成功"
            })
        } else {
            this.ctx.service.ajax.error("注册失败", ERROR.SIGN_UP_FAILED)
        }
    }

    async signIn () {
        const data = this.ctx.request.body
        const isRightSignInParam = checkSignInParam(data)
        if (isRightSignInParam !== true) {
            this.ctx.service.ajax.error(isRightSignInParam, ERROR.SIGN_IN_FAILED) // this.ctx.service.ajax.errorId("请输入正确的登录信息")
            return
        }
        const account = await this.signInAccount(data)
        if (account && account.length === 1) {
            const id = account[0]._id.toString()
            this.ctx.session.ck = this.service.ck.createCk(id)
            this.ctx.session.userId = id
            this.updateLoginTime(id)
            this.ctx.service.ajax.success({
                "message": "登录成功",
                "ck": this.ctx.session.ck,
                "name": account[0].name
            })
        } else {
            this.ctx.service.ajax.error("账号密码错误", ERROR.SIGN_IN_VERIFY_FAILED) // this.ctx.service.ajax.errorId("账号密码错误")
        }
    }

    async checkEmail () {
        const email = this.ctx.request.query.email
        const isHasSameName = await this.hasThisEmail(email)
        if (isHasSameName) {
            this.ctx.service.ajax.success({ "isUsed": true })
        } else {
            this.ctx.service.ajax.success({ "isUsed": false })
        }
    }

    signOut () {
        this.ctx.session = null
        this.ctx.service.ajax.success({ "signout": true })
    }

    async getUserInfo () {
        const ck = decodeURIComponent(this.ctx.query.ck)
        const session = this.ctx.session
        const userId = session.userId
        if (ck && session.ck && userId && ck === session.ck && this.service.ck.isExpiredCk(userId, ck) === false) {
            let account = await this.getAccountByUserId(userId)
            if (account !== false) {
                account = account[0].toJSON()
                delete account.password
                delete account.__v
                account._id = account._id.toString()
                this.ctx.service.ajax.success(account)
            } else {
                this.ctx.service.ajax.error("获取账户信息失败", ERROR.GET_USER_INFO_FAILED)
            }
        } else {
            this.errorLogin()
        }
    }

    errorLogin () {
        this.ctx.service.ajax.error("登录信息失效，请重新登录", ERROR.USER_TOKEN_EXPIRED)
    }

    hasThisEmail (email) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.find({ "email": email }, (err, docs) => {
                if (err || (docs && docs.length !== 0)) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    getAccountByUserId (userId) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.find({ "_id": mongoose.mongo.ObjectId(userId) }, (err, docs) => {
                if (err || (docs && docs.length === 0)) {
                    resolve(false)
                } else {
                    resolve(docs)
                }
            })
        })
    }

    signInAccount (data) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.find({ "email": data.email, "password": data.password }, (err, docs) => {
                if (err || (docs && docs.length === 0)) {
                    resolve(false)
                } else {
                    resolve(docs)
                }
            })
        })
    }

    updateLoginTime (id) {
        this.ctx.model.UserInfo.update({ "_id": mongoose.mongo.ObjectId(id) }, { "last_login_time": new Date() }, () => {})
    }

    updateCk () {
        this.ctx.session.ck = this.ctx.service.ck.updateCk(this.ctx.session.userId, this.ctx.session.ck)
    }

    isLogin () {
        if (this.ctx.session.userId && this.ctx.session.ck && this.isRightCk()) {
            this.updateLoginTime()
            this.updateCk()
        }
        return false
    }

    createAccount (data) {
        return new Promise(resolve => {
            this.ctx.model.UserInfo.create({
                "email": data.email,
                "password": data.password,
                "name": data.name
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

function checkSignUpParam (data) {
    const mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (!data.password) {
        return "请填写密码"
    } else if (!data.name) {
        return "请输入昵称"
    } else if (!(data.email && mailReg.test(data.email))) {
        return "请输入正确的邮箱地址"
    } else if (data.password.length < 6) {
        return "密码不得少于6位"
    }
    return true
}

function checkSignInParam (data) {
    if (!data.email) {
        return "请填写邮箱"
    } else if (!data.password) {
        return "请填写密码"
    }
    return true
}

module.exports = UserController
