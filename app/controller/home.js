
const Controller = require("egg").Controller

class HomeController extends Controller {
    async common() {
        this.ctx.body = ''
    }
}

module.exports = HomeController
