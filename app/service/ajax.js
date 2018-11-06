const Service = require("egg").Service
class Response extends Service {
    error (message, errorId) {
        this.setCors()
        this.ctx.response.body = {
            "success": false,
            "data": {},
            message,
            errorId
        }
    }
    success (json = {}) {
        this.setCors()
        this.ctx.response.body = {
            "success": true,
            "data": json
        }
    }
    setCors () {
        this.ctx.set("Access-Control-Allow-Origin", this.ctx.request.headers.origin)
        this.ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
        this.ctx.set("Access-Control-Allow-Headers", "Accept, Cache-Control, Content-Type, Language")
        this.ctx.set("Access-Control-Allow-Credentials", "true")
    }
}

module.exports = Response
