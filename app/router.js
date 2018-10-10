
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app
    router.get("/user/signin", controller.user.signin)
    router.post("/user/signup", controller.user.signup)
    router.get("/", controller.home.index)
}
