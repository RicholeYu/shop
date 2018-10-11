
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app

    router.post("/user/sign_in", controller.user.signIn)
    router.post("/user/sign_up", controller.user.signUp)
    router.get("/user/check_username", controller.user.checkUsername)
    router.options(/\/.*/, controller.home.common)
}
