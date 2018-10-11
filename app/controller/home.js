const Controller = require("egg").Controller

class HomeController extends Controller {
    common() {
        this.ctx.service.ajax.success({})
    }
}

module.exports = HomeController
