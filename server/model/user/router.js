const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

router.route('/auth/session')
  .get(isLoggedIn, controller.getSession)
router.route('/auth/logout')
  .get(isLoggedIn, controller.logout);

// Twitter Routes
router.route('/auth/twitter/login')
  .get(controller.authenticateTwitter);
router.route('/auth/twitter/callback')
  .get(controller.callbackAuthTwitter);
router.route('/connect/twitter/login')
  .get(controller.authorizeTwitter)
router.route('/connect/twitter/callback')
  .get(controller.callbackAuthzTwitter)
router.route('/unlink/twitter')
  .get((...args) => controller.unlinkTwitter(...args))


module.exports = router;
