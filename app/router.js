
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app

    router.post("/chat/user/sign_in", controller.user.signIn)
    router.post("/chat/user/sign_up", controller.user.signUp)
    router.get("/chat/user/check_email", controller.user.checkEmail)
    router.get("/chat/user/sign_out", controller.user.signOut)
    router.post("/chat/user/upload_head_img", app.middleware.login, controller.user.uploadHeadImg)
    router.get("/chat/user/get_users", app.middleware.login, controller.user.getUsers)

    router.get('/chat/user/get_user_info', app.middleware.login, controller.user.getUserInfo)
    router.options(/\/.*/, controller.home.common)
}
