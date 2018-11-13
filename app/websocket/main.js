const ws = require('ws')
const controller = require('./controller')
const ERROR = require('../public/error')
const wss = new ws.Server({
    "port": 9091
})

let vm

module.exports = {
    __initWebsocket (app) {
        vm = app
        this.websocket.init()
    },
    "websocket": {
        init () {
            wss.on('connection', connect => {
                connect.__isLogin = false
                vm.sockets.push(connect)
                connect.on('message', data => {
                    try {
                        data = JSON.parse(data)
                        const type = data.type
                        if (type && typeof type === 'string') {
                            if (!this.isLogin(connect) && type !== 'login') {
                                this.error(connect, "Websocket链接尚未验证身份", ERROR.WS_NOT_VERIFY_ACCOUNT)
                                return
                            }
                            controller[type] && controller[type].call(vm, connect, data)
                        } else {
                            this.error(connect, "JSON格式错误，请输入正确的JSON格式", ERROR.WS_JSON_FOTMATE_ERROR)
                        }
                    } catch (e) {
                        this.error(connect, "JSON解析错误，请输入正确的JSON字符串", ERROR.WS_JSON_ERROR)
                        return
                    }
                })
            })
        },
        send (connect, data) {
            connect && connect.send(JSON.stringify(data))
        },
        error (connect, message, errorId) {
            this.send(connect, {
                "success": false,
                message,
                errorId,
                "data": {}
            })
        },
        success (connect, data) {
            this.send(connect, {
                "success": true,
                data
            })
        },
        sendAll (data) {
            vm.sockets.map(connect => this.send(connect, data))
        },
        isLogin (connect) {
            return connect.__isLogin
        }
    },
    "sockets": []
}
// 发送信息给别人
// this.ctx.app.websocket.send(id, data)
// 发送信息给全部人
// this.ctx.app.websocket.sendAll(data)
// this.ctx.app.websocket.
