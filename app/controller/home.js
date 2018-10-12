
const Controller = require("egg").Controller

class HomeController extends Controller {
    async getUserInfo(ctx) {
        ctx.service.ajax.success({ "message": 'getUserInfo' })
    }
}

module.exports = HomeController
