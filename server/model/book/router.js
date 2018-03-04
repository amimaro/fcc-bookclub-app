const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/query/:query')
  .get((...args) => controller.query(...args));

router.route('/user')
  .get((...args) => controller.findByUser(...args));

router.route('/trade/:id')
  .put((...args) => controller.trade(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
