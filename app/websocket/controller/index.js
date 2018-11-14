const service = require('../service')
const ERROR = require('../../public/error')
const controller = {
    async login (connect, data) {
        const authResult = await service.verifyAccount.call(this, data.email || '', data.password || '')
        if (authResult) {
            connect.__isLogin = true
            connect.__userId = authResult
            this.websocket.removeSameConnect(connect, connect.__userId)
            this.websocket.sendAll({
                "type": "login",
                "user_id": connect.__userId
            })
        } else {
            connect.__isLogin = false
            connect.__userId = null
            this.websocket.error(connect, "登录失败, 账号密码错误", ERROR.WS_LOGIN_FAILED)
        }
    },

    send (connect, data) {
        if (!data.message) {
            this.websocket.error(connect, "缺少message", ERROR.WS_LACK_OF_MESSAGE)
            return
        }
        if (!data.user_id) {
            this.websocket.error(connect, "缺少user_id", ERROR.WS_LACK_OF_USERID)
            return
        }
        if (data.user_id === connect.__userId) {
            this.websocket.error(connect, "不能给自己发消息", ERROR.WS_FOOLISH)
            return
        }
        const userConnect = service.getConnectByUserId.call(this, data.user_id)
        if (userConnect) {
            this.websocket.send(userConnect, {
                "message": data.message || '',
                "user_id": connect.__userId,
                "type": "message"
            })
            this.websocket.success(connect, {
                "message": "消息发送成功",
                "type": "send_message"
            })
        } else {
            this.websocket.error(connect, "当前用户尚未上线，消息发送失败", ERROR.WS_SEND_ERROR)
        }
    },

    ping (connect) {
        this.websocket.send(connect, { "message": "pong" })
    }
}

module.exports = controller
