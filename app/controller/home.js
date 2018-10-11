const Controller = require("egg").Controller

class HomeController extends Controller {
    async index() {
        this.ctx.body = "hi, egg"
    }
    common() {
        this.ctx.service.ajax.success({})
    }
}

module.exports = HomeController
