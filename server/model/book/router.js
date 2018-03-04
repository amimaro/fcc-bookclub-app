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

router.route('/query/:query')
  .get((...args) => controller.query(...args));

router.route('/user/:id')
  .get((...args) => controller.findByUser(...args));


module.exports = router;
