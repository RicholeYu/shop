
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app

    router.post("/user/signin", controller.user.signin)
    router.post("/user/signup", controller.user.signup)
    router.get("/", controller.home.index)
    router.get(/\/.*/, controller.home.common)
    router.options(/\/.*/, controller.home.common)
}
