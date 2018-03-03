const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const passport = require('passport');


class UserController extends Controller {

  // Returns Session if Logged-in
  getSession(req, res, next) {
    res.json(req.user);
  }

  // Logout
  logout(req, res, next) {
    req.logout();
    res.redirect('/');
  }

  // Twitter

  authenticateTwitter(req, res, next) {
    passport.authenticate('twitter')(req, res, next);
  }

  authorizeTwitter(req, res, next) {
    passport.authorize('twitter')(req, res, next);
  }

  callbackAuthTwitter(req, res, next) {
    passport.authenticate('twitter', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzTwitter(req, res, next) {
    passport.authorize('twitter', function(err, data) {
      if (err)
        return next(err);
      if (data)
        req.session.user = data
      res.redirect('/profile')
    })(req, res, next);
  }

  unlinkTwitter(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          twitter: 1
        }
      })
      .then((results) => {
        delete req.user.twitter
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }

}

module.exports = new UserController(userFacade);
