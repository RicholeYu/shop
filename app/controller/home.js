
const Controller = require("egg").Controller

class HomeController extends Controller {
    async common () {
        this.ctx.body = ' '
        this.ctx.set("Access-Control-Allow-Origin", this.ctx.request.headers.origin)
        this.ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
        this.ctx.set("Access-Control-Allow-Headers", "Accept, Cache-Control, Content-Type, Language")
        this.ctx.set("Access-Control-Allow-Credentials", "true")
    }
}

module.exports = HomeController
