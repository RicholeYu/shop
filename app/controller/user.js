const Controller = require("egg").Controller
const mongoose = require("mongoose")

class UserController extends Controller {
    async signUp() {
        const data = this.ctx.request.body
        const isRightSignUpParam = checkSignUpParam(data)
        if (this.ctx.sesion && this.ctx.session.ck) {
            this.ctx.service.ajax.error("你已登录", 1000) // this.ctx.service.ajax.errorId("注册信息验证不通过")
            return
        }
        if (isRightSignUpParam !== true) {
            this.ctx.service.ajax.error(isRightSignUpParam, 1000) // this.ctx.service.ajax.errorId("注册信息验证不通过")
            return
        }
        const isHasSameName = await this.hasThisName(data.username)
        if (isHasSameName) {
            this.ctx.service.ajax.error("已拥有该用户名", 1001) // this.ctx.service.ajax.errorId("已拥有该用户名")
            return
        }
        const isCreateSuccess = await this.createAccount(data)
        if (isCreateSuccess) {
            this.ctx.service.ajax.success({
                "message": "注册成功",
            })
        } else {
            this.ctx.service.ajax.error("注册失败", 1002) // this.ctx.service.ajax.errorId("注册失败")
        }
    }

    async signIn() {
        const data = this.ctx.request.body
        const isRightSignInParam = checkSignInParam(data)
        if (isRightSignInParam !== true) {
            this.ctx.service.ajax.error(isRightSignInParam, 1003) // this.ctx.service.ajax.errorId("请输入正确的登录信息")
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

            })
        } else {
            this.ctx.service.ajax.error("账号密码错误", 1004) // this.ctx.service.ajax.errorId("账号密码错误")
        }

    }

    async checkUsername() {
        const username = this.ctx.request.query.username
        const isHasSameName = await this.hasThisName(username)
        if (isHasSameName) {
            this.ctx.service.ajax.success({ "isUsed": true })
        } else {
            this.ctx.service.ajax.success({ "isUsed": false })
        }
    }

    signOut () {
      this.ctx.session = null
      this.ctx.service.ajax.success({signout: true})
    }

    async getUserInfo() {
      let ck = decodeURIComponent(this.ctx.query.ck)
      let session = this.ctx.session
      let userId = session.userId
      if (ck && session.ck && userId && ck === session.ck && this.service.ck.isExpiredCk(userId, ck) === false) {
        let account = await this.getAccountByUserId(userId)
        if (account !== false) {
          account = account[0].toJSON()
          delete account.password
          delete account.__v
          account._id = account._id.toString()
          this.ctx.service.ajax.success({...account})
        } else {
          this.ctx.service.ajax.error("获取账户信息失败", 1006)
        }
      } else {
        this.errorLogin()
      }
    }

    errorLogin() {
        this.ctx.service.ajax.error("登录信息失效，请重新登录", 1005)
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
        this.ctx.model.UserInfo.update({ "_id": mongoose.mongo.ObjectId(id) }, { "last_login_time": new Date() }, () => {})
    }

    updateCk() {
        this.ctx.session.ck = this.ctx.service.ck.updateCk(this.ctx.session.userId, this.ctx.session.ck)
    }

    isLogin() {
        if (this.ctx.session.userId && this.ctx.session.ck && this.isRightCk()) {
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
    } else if (data.username.length < 5) {
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
