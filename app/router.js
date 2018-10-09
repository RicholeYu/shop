'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/signup', controller.user.signup);
  router.post('/user/signin', controller.user.signin);
  router.get('/', controller.home.index);
};
