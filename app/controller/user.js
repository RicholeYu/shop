'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async signup() {
    // let signupEntity = new this.service.mongo.schema.user_info({
    //     username : ,
    //     age  : 28,
    //     email: "helloworld@qq.com"
    // });
    this.ctx.body = 'hello';
  }

  async signin() {
    this.ctx.body = 'hello';
  }
}

module.exports = HomeController;
